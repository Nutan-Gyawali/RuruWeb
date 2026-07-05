using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThorgaApi.Authorization;
using ThorgaApi.Data;
using ThorgaApi.Dtos;
using ThorgaApi.Models;

namespace ThorgaApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MembersController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public MembersController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetMembers()
    {
        if (!PermissionHelper.UserHasPermission(User, "members.read"))
        {
            return Forbid();
        }

        var members = await _dbContext.Members
            .OrderByDescending(m => m.CreatedAt)
            .Select(m => new MemberDto(m.Id, m.FullName, m.Email, m.Phone, m.Address, m.MembershipType, m.CreatedAt))
            .ToListAsync();

        return Ok(members);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MemberDto>> GetMember(int id)
    {
        if (!PermissionHelper.UserHasPermission(User, "members.read"))
        {
            return Forbid();
        }

        var member = await _dbContext.Members.FindAsync(id);

        if (member == null)
        {
            return NotFound();
        }

        return Ok(new MemberDto(member.Id, member.FullName, member.Email, member.Phone, member.Address, member.MembershipType, member.CreatedAt));
    }

    [HttpPost]
    public async Task<ActionResult<MemberDto>> CreateMember(MemberDto memberDto)
    {
        var member = new Member
        {
            FullName = memberDto.FullName,
            Email = memberDto.Email,
            Phone = memberDto.Phone,
            Address = memberDto.Address,
            MembershipType = memberDto.MembershipType,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Members.Add(member);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMember), new { id = member.Id }, new MemberDto(member.Id, member.FullName, member.Email, member.Phone, member.Address, member.MembershipType, member.CreatedAt));
    }
}
