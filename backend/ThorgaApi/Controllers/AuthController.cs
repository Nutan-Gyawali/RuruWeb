using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThorgaApi.Data;
using ThorgaApi.Dtos;
using ThorgaApi.Models;
using ThorgaApi.Services;

namespace ThorgaApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly JwtTokenService _jwtTokenService;
    private readonly ApplicationDbContext _dbContext;

    public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, JwtTokenService jwtTokenService, ApplicationDbContext dbContext)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtTokenService = jwtTokenService;
        _dbContext = dbContext;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var existing = await _userManager.FindByEmailAsync(request.Email);
        if (existing is not null)
        {
            return BadRequest(new { message = "Email already exists." });
        }

        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            FullName = request.FullName,
            CreatedAt = DateTime.UtcNow
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        await _userManager.AddToRoleAsync(user, "general members");
        await _dbContext.SaveChangesAsync();

        var roles = (await _userManager.GetRolesAsync(user)).ToList();
        var permissions = await _dbContext.SiteRolePermissions
            .Where(x => roles.Contains(x.RoleName))
            .Select(x => x.Permission)
            .Distinct()
            .ToListAsync();

        var token = _jwtTokenService.CreateToken(user, roles, permissions);
        return Ok(new { token, email = user.Email, fullName = user.FullName, roles });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            return Unauthorized(new { message = "Invalid credentials." });
        }

        var signInResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
        if (!signInResult.Succeeded)
        {
            return Unauthorized(new { message = "Invalid credentials." });
        }

        var roles = (await _userManager.GetRolesAsync(user)).ToList();
        var permissions = await _dbContext.SiteRolePermissions
            .Where(x => roles.Contains(x.RoleName))
            .Select(x => x.Permission)
            .Distinct()
            .ToListAsync();

        var token = _jwtTokenService.CreateToken(user, roles, permissions);
        return Ok(new { token, email = user.Email, fullName = user.FullName, roles });
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user is null)
        {
            return NotFound();
        }

        var roles = (await _userManager.GetRolesAsync(user)).ToList();
        var permissions = await _dbContext.SiteRolePermissions
            .Where(x => roles.Contains(x.RoleName))
            .Select(x => x.Permission)
            .Distinct()
            .ToListAsync();

        return Ok(new { user.Id, user.Email, user.FullName, roles, permissions });
    }
}
