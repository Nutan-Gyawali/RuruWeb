using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThorgaApi.Authorization;
using ThorgaApi.Data;
using ThorgaApi.Models;

namespace ThorgaApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RolesController : ControllerBase
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _dbContext;

    public RolesController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext)
    {
        _roleManager = roleManager;
        _userManager = userManager;
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetRoles()
    {
        if (!PermissionHelper.UserHasPermission(User, "roles.read"))
        {
            return Forbid();
        }

        var roles = await _roleManager.Roles
            .OrderBy(r => r.Name)
            .Select(r => new { r.Id, r.Name })
            .ToListAsync();

        return Ok(roles);
    }

    [HttpPost]
    public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
    {
        if (!PermissionHelper.UserHasPermission(User, "roles.write"))
        {
            return Forbid();
        }

        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new { message = "Role name is required." });
        }

        var role = new IdentityRole(request.Name.Trim());
        var result = await _roleManager.CreateAsync(role);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new { role.Id, role.Name });
    }

    [HttpPost("assign")]
    public async Task<IActionResult> AssignRole([FromBody] AssignRoleRequest request)
    {
        if (!PermissionHelper.UserHasPermission(User, "roles.write"))
        {
            return Forbid();
        }

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            return NotFound(new { message = "User not found." });
        }

        var result = await _userManager.AddToRoleAsync(user, request.RoleName);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new { message = "Role assigned." });
    }

    [HttpPost("permissions")]
    public async Task<IActionResult> SavePermissions([FromBody] SavePermissionsRequest request)
    {
        if (!PermissionHelper.UserHasPermission(User, "roles.write"))
        {
            return Forbid();
        }

        var roleName = request.RoleName.Trim();
        var permissions = request.Permissions ?? new List<string>();

        var existing = await _dbContext.SiteRolePermissions.Where(x => x.RoleName == roleName).ToListAsync();
        _dbContext.SiteRolePermissions.RemoveRange(existing);
        _dbContext.SiteRolePermissions.AddRange(permissions.Select(permission => new SiteRolePermission
        {
            RoleName = roleName,
            Permission = permission.Trim()
        }));

        await _dbContext.SaveChangesAsync();
        return Ok(new { message = "Permissions updated." });
    }

    [HttpPut("permissions")]
    public async Task<IActionResult> UpdatePermissions([FromBody] SavePermissionsRequest request)
    {
        if (!PermissionHelper.UserHasPermission(User, "roles.write"))
        {
            return Forbid();
        }

        var roleName = request.RoleName.Trim();
        var permissions = request.Permissions ?? new List<string>();

        var existing = await _dbContext.SiteRolePermissions.Where(x => x.RoleName == roleName).ToListAsync();
        _dbContext.SiteRolePermissions.RemoveRange(existing);
        _dbContext.SiteRolePermissions.AddRange(permissions.Select(permission => new SiteRolePermission
        {
            RoleName = roleName,
            Permission = permission.Trim()
        }));

        await _dbContext.SaveChangesAsync();
        return Ok(new { message = "Permissions updated." });
    }

    [HttpGet("permissions/{roleName}")]
    public async Task<IActionResult> GetPermissions(string roleName)
    {
        if (!PermissionHelper.UserHasPermission(User, "roles.read"))
        {
            return Forbid();
        }

        var permissions = await _dbContext.SiteRolePermissions
            .Where(x => x.RoleName == roleName)
            .Select(x => x.Permission)
            .ToListAsync();

        return Ok(permissions);
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        if (!PermissionHelper.UserHasPermission(User, "roles.read"))
        {
            return Forbid();
        }

        var users = await _userManager.Users
            .OrderBy(u => u.Email)
            .Select(u => new { u.Id, u.Email, u.FullName })
            .ToListAsync();

        return Ok(users);
    }
}

public record CreateRoleRequest(string Name);
public record AssignRoleRequest(string Email, string RoleName);
public record SavePermissionsRequest(string RoleName, IEnumerable<string>? Permissions);
