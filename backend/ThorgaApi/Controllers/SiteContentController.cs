using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using ThorgaApi.Authorization;
using ThorgaApi.Data;
using ThorgaApi.Dtos;
using ThorgaApi.Models;

namespace ThorgaApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SiteContentController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public SiteContentController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("content")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<SiteContentDto>>> GetContent([FromQuery] string? category)
    {
        var query = _dbContext.SiteContents.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(x => x.Category.ToLower() == category.Trim().ToLower());
        }

        var items = await query
            .Where(x => x.IsActive)
            .OrderBy(x => x.SortOrder)
            .ThenBy(x => x.Title)
            .Select(x => new SiteContentDto(x.Id, x.Category, x.Title, x.Body, x.Summary, x.SortOrder, x.IsActive, x.CreatedAt, x.UpdatedAt, x.TitleEn, x.TitleNe, x.BodyEn, x.BodyNe, x.SummaryEn, x.SummaryNe))
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("content/{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<SiteContentDto>> GetContentById(int id)
    {
        var item = await _dbContext.SiteContents.FindAsync(id);
        if (item == null) return NotFound();

        return Ok(new SiteContentDto(item.Id, item.Category, item.Title, item.Body, item.Summary, item.SortOrder, item.IsActive, item.CreatedAt, item.UpdatedAt, item.TitleEn, item.TitleNe, item.BodyEn, item.BodyNe, item.SummaryEn, item.SummaryNe));
    }

    [HttpPost("content")]
    [Authorize]
    public async Task<ActionResult<SiteContentDto>> CreateContent([FromBody] CreateSiteContentDto dto)
    {
        if (!PermissionHelper.UserHasPermission(User, "content.write"))
        {
            return Forbid();
        }

        var entity = new SiteContent
        {
            Category = dto.Category.Trim(),
            Title = dto.Title.Trim(),
            Body = dto.Body.Trim(),
            Summary = dto.Summary?.Trim(),
            TitleEn = dto.TitleEn?.Trim(),
            TitleNe = dto.TitleNe?.Trim(),
            BodyEn = dto.BodyEn?.Trim(),
            BodyNe = dto.BodyNe?.Trim(),
            SummaryEn = dto.SummaryEn?.Trim(),
            SummaryNe = dto.SummaryNe?.Trim(),
            SortOrder = dto.SortOrder,
            IsActive = ParseBoolean(dto.IsActive),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _dbContext.SiteContents.Add(entity);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetContentById), new { id = entity.Id }, new SiteContentDto(entity.Id, entity.Category, entity.Title, entity.Body, entity.Summary, entity.SortOrder, entity.IsActive, entity.CreatedAt, entity.UpdatedAt, entity.TitleEn, entity.TitleNe, entity.BodyEn, entity.BodyNe, entity.SummaryEn, entity.SummaryNe));
    }

    [HttpPut("content/{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateContent(int id, [FromBody] UpdateSiteContentDto dto)
    {
        if (!PermissionHelper.UserHasPermission(User, "content.write"))
        {
            return Forbid();
        }

        var entity = await _dbContext.SiteContents.FindAsync(id);
        if (entity == null) return NotFound();

        if (dto.Category is not null) entity.Category = dto.Category.Trim();
        if (dto.Title is not null) entity.Title = dto.Title.Trim();
        if (dto.Body is not null) entity.Body = dto.Body.Trim();
        if (dto.Summary is not null) entity.Summary = dto.Summary.Trim();
        if (dto.TitleEn is not null) entity.TitleEn = dto.TitleEn.Trim();
        if (dto.TitleNe is not null) entity.TitleNe = dto.TitleNe.Trim();
        if (dto.BodyEn is not null) entity.BodyEn = dto.BodyEn.Trim();
        if (dto.BodyNe is not null) entity.BodyNe = dto.BodyNe.Trim();
        if (dto.SummaryEn is not null) entity.SummaryEn = dto.SummaryEn.Trim();
        if (dto.SummaryNe is not null) entity.SummaryNe = dto.SummaryNe.Trim();
        if (dto.SortOrder is not null) entity.SortOrder = dto.SortOrder.Value;
        if (dto.IsActive is not null) entity.IsActive = ParseBoolean(dto.IsActive);
        entity.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("content/{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteContent(int id)
    {
        if (!PermissionHelper.UserHasPermission(User, "content.write"))
        {
            return Forbid();
        }

        var entity = await _dbContext.SiteContents.FindAsync(id);
        if (entity == null) return NotFound();

        _dbContext.SiteContents.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("people")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<PersonProfileDto>>> GetPeople([FromQuery] string? category)
    {
        var query = _dbContext.PersonProfiles.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(x => x.Category.ToLower() == category.Trim().ToLower());
        }

        var items = await query
            .Where(x => x.IsActive)
            .OrderBy(x => x.SortOrder)
            .ThenBy(x => x.Name)
            .Select(x => new PersonProfileDto(x.Id, x.Category, x.Name, x.Position, x.Description, x.ImageUrl, x.ExternalLink, x.SortOrder, x.IsActive, x.CreatedAt, x.UpdatedAt, x.NameEn, x.NameNe, x.PositionEn, x.PositionNe, x.DescriptionEn, x.DescriptionNe))
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("people/{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<PersonProfileDto>> GetPersonById(int id)
    {
        var item = await _dbContext.PersonProfiles.FindAsync(id);
        if (item == null) return NotFound();

        return Ok(new PersonProfileDto(item.Id, item.Category, item.Name, item.Position, item.Description, item.ImageUrl, item.ExternalLink, item.SortOrder, item.IsActive, item.CreatedAt, item.UpdatedAt, item.NameEn, item.NameNe, item.PositionEn, item.PositionNe, item.DescriptionEn, item.DescriptionNe));
    }

    [HttpPost("people")]
    [Authorize]
    public async Task<ActionResult<PersonProfileDto>> CreatePerson([FromBody] CreatePersonProfileDto dto)
    {
        if (!PermissionHelper.UserHasPermission(User, "content.write"))
        {
            return Forbid();
        }

        var entity = new PersonProfile
        {
            Category = dto.Category.Trim(),
            Name = dto.Name.Trim(),
            Position = dto.Position?.Trim(),
            Description = dto.Description?.Trim(),
            ImageUrl = dto.ImageUrl?.Trim(),
            ExternalLink = dto.ExternalLink?.Trim(),
            NameEn = dto.NameEn?.Trim(),
            NameNe = dto.NameNe?.Trim(),
            PositionEn = dto.PositionEn?.Trim(),
            PositionNe = dto.PositionNe?.Trim(),
            DescriptionEn = dto.DescriptionEn?.Trim(),
            DescriptionNe = dto.DescriptionNe?.Trim(),
            SortOrder = dto.SortOrder,
            IsActive = ParseBoolean(dto.IsActive),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _dbContext.PersonProfiles.Add(entity);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPersonById), new { id = entity.Id }, new PersonProfileDto(entity.Id, entity.Category, entity.Name, entity.Position, entity.Description, entity.ImageUrl, entity.ExternalLink, entity.SortOrder, entity.IsActive, entity.CreatedAt, entity.UpdatedAt, entity.NameEn, entity.NameNe, entity.PositionEn, entity.PositionNe, entity.DescriptionEn, entity.DescriptionNe));
    }

    [HttpPut("people/{id}")]
    [Authorize]
    public async Task<IActionResult> UpdatePerson(int id, [FromBody] UpdatePersonProfileDto dto)
    {
        if (!PermissionHelper.UserHasPermission(User, "content.write"))
        {
            return Forbid();
        }

        var entity = await _dbContext.PersonProfiles.FindAsync(id);
        if (entity == null) return NotFound();

        if (dto.Category is not null) entity.Category = dto.Category.Trim();
        if (dto.Name is not null) entity.Name = dto.Name.Trim();
        if (dto.Position is not null) entity.Position = dto.Position.Trim();
        if (dto.Description is not null) entity.Description = dto.Description.Trim();
        if (dto.ImageUrl is not null) entity.ImageUrl = dto.ImageUrl.Trim();
        if (dto.ExternalLink is not null) entity.ExternalLink = dto.ExternalLink.Trim();
        if (dto.NameEn is not null) entity.NameEn = dto.NameEn.Trim();
        if (dto.NameNe is not null) entity.NameNe = dto.NameNe.Trim();
        if (dto.PositionEn is not null) entity.PositionEn = dto.PositionEn.Trim();
        if (dto.PositionNe is not null) entity.PositionNe = dto.PositionNe.Trim();
        if (dto.DescriptionEn is not null) entity.DescriptionEn = dto.DescriptionEn.Trim();
        if (dto.DescriptionNe is not null) entity.DescriptionNe = dto.DescriptionNe.Trim();
        if (dto.SortOrder is not null) entity.SortOrder = dto.SortOrder.Value;
        if (dto.IsActive is not null) entity.IsActive = ParseBoolean(dto.IsActive);
        entity.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("people/{id}")]
    [Authorize]
    public async Task<IActionResult> DeletePerson(int id)
    {
        if (!PermissionHelper.UserHasPermission(User, "content.write"))
        {
            return Forbid();
        }

        var entity = await _dbContext.PersonProfiles.FindAsync(id);
        if (entity == null) return NotFound();

        _dbContext.PersonProfiles.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("images")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<SiteImageDto>>> GetImages([FromQuery] string? category)
    {
        var query = _dbContext.SiteImages.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(x => x.Category.ToLower() == category.Trim().ToLower());
        }

        var items = await query
            .Where(x => x.IsActive)
            .OrderBy(x => x.SortOrder)
            .ThenBy(x => x.Title)
            .Select(x => new SiteImageDto(x.Id, x.Category, x.Title, x.Description, x.ImageUrl, x.SortOrder, x.IsActive, x.CreatedAt, x.UpdatedAt, x.TitleEn, x.TitleNe, x.DescriptionEn, x.DescriptionNe))
            .ToListAsync();

        return Ok(items);
    }

    [HttpGet("images/{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<SiteImageDto>> GetImageById(int id)
    {
        var item = await _dbContext.SiteImages.FindAsync(id);
        if (item == null) return NotFound();

        return Ok(new SiteImageDto(item.Id, item.Category, item.Title, item.Description, item.ImageUrl, item.SortOrder, item.IsActive, item.CreatedAt, item.UpdatedAt, item.TitleEn, item.TitleNe, item.DescriptionEn, item.DescriptionNe));
    }

    [HttpPost("images")]
    [Authorize]
    public async Task<ActionResult<SiteImageDto>> CreateImage([FromBody] CreateSiteImageDto dto)
    {
        if (!PermissionHelper.UserHasPermission(User, "content.write"))
        {
            return Forbid();
        }

        var entity = new SiteImage
        {
            Category = dto.Category.Trim(),
            Title = dto.Title.Trim(),
            Description = dto.Description?.Trim(),
            ImageUrl = dto.ImageUrl.Trim(),
            TitleEn = dto.TitleEn?.Trim(),
            TitleNe = dto.TitleNe?.Trim(),
            DescriptionEn = dto.DescriptionEn?.Trim(),
            DescriptionNe = dto.DescriptionNe?.Trim(),
            SortOrder = dto.SortOrder,
            IsActive = ParseBoolean(dto.IsActive),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _dbContext.SiteImages.Add(entity);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetImageById), new { id = entity.Id }, new SiteImageDto(entity.Id, entity.Category, entity.Title, entity.Description, entity.ImageUrl, entity.SortOrder, entity.IsActive, entity.CreatedAt, entity.UpdatedAt, entity.TitleEn, entity.TitleNe, entity.DescriptionEn, entity.DescriptionNe));
    }

    [HttpPut("images/{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateImage(int id, [FromBody] UpdateSiteImageDto dto)
    {
        if (!PermissionHelper.UserHasPermission(User, "content.write"))
        {
            return Forbid();
        }

        var entity = await _dbContext.SiteImages.FindAsync(id);
        if (entity == null) return NotFound();

        if (dto.Category is not null) entity.Category = dto.Category.Trim();
        if (dto.Title is not null) entity.Title = dto.Title.Trim();
        if (dto.Description is not null) entity.Description = dto.Description.Trim();
        if (dto.ImageUrl is not null) entity.ImageUrl = dto.ImageUrl.Trim();
        if (dto.TitleEn is not null) entity.TitleEn = dto.TitleEn.Trim();
        if (dto.TitleNe is not null) entity.TitleNe = dto.TitleNe.Trim();
        if (dto.DescriptionEn is not null) entity.DescriptionEn = dto.DescriptionEn.Trim();
        if (dto.DescriptionNe is not null) entity.DescriptionNe = dto.DescriptionNe.Trim();
        if (dto.SortOrder is not null) entity.SortOrder = dto.SortOrder.Value;
        if (dto.IsActive is not null) entity.IsActive = ParseBoolean(dto.IsActive);
        entity.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("images/{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteImage(int id)
    {
        if (!PermissionHelper.UserHasPermission(User, "content.write"))
        {
            return Forbid();
        }

        var entity = await _dbContext.SiteImages.FindAsync(id);
        if (entity == null) return NotFound();

        _dbContext.SiteImages.Remove(entity);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    private static bool ParseBoolean(JsonElement? value)
    {
        if (value is null || value.Value.ValueKind == JsonValueKind.Undefined)
        {
            return true;
        }

        if (value.Value.ValueKind == JsonValueKind.True) return true;
        if (value.Value.ValueKind == JsonValueKind.False) return false;
        if (value.Value.ValueKind == JsonValueKind.String)
        {
            var text = value.Value.GetString();
            if (bool.TryParse(text, out var parsedBool)) return parsedBool;
            if (int.TryParse(text, out var intValue)) return intValue != 0;
        }

        if (value.Value.ValueKind == JsonValueKind.Number)
        {
            if (value.Value.TryGetInt32(out var intValue)) return intValue != 0;
            if (value.Value.TryGetInt64(out var longValue)) return longValue != 0;
        }

        return true;
    }
}
