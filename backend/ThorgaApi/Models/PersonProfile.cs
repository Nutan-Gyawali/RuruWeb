namespace ThorgaApi.Models;

public class PersonProfile
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Position { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? ExternalLink { get; set; }
    public string? NameEn { get; set; }
    public string? NameNe { get; set; }
    public string? PositionEn { get; set; }
    public string? PositionNe { get; set; }
    public string? DescriptionEn { get; set; }
    public string? DescriptionNe { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
