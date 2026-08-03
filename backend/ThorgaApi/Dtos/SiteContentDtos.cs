using System.Text.Json;

namespace ThorgaApi.Dtos;

public record SiteContentDto(
    int Id,
    string Category,
    string Title,
    string Body,
    string? Summary,
    int SortOrder,
    bool IsActive,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    string? TitleEn,
    string? TitleNe,
    string? BodyEn,
    string? BodyNe,
    string? SummaryEn,
    string? SummaryNe);

public record CreateSiteContentDto(
    string Category,
    string Title,
    string Body,
    string? Summary,
    int SortOrder,
    JsonElement? IsActive,
    string? TitleEn,
    string? TitleNe,
    string? BodyEn,
    string? BodyNe,
    string? SummaryEn,
    string? SummaryNe);

public record UpdateSiteContentDto(
    string? Category,
    string? Title,
    string? Body,
    string? Summary,
    int? SortOrder,
    JsonElement? IsActive,
    string? TitleEn,
    string? TitleNe,
    string? BodyEn,
    string? BodyNe,
    string? SummaryEn,
    string? SummaryNe);

public record PersonProfileDto(
    int Id,
    string Category,
    string Name,
    string? Position,
    string? Description,
    string? ImageUrl,
    string? ExternalLink,
    int SortOrder,
    bool IsActive,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    string? NameEn,
    string? NameNe,
    string? PositionEn,
    string? PositionNe,
    string? DescriptionEn,
    string? DescriptionNe);

public record CreatePersonProfileDto(
    string Category,
    string Name,
    string? Position,
    string? Description,
    string? ImageUrl,
    string? ExternalLink,
    int SortOrder,
    JsonElement? IsActive,
    string? NameEn,
    string? NameNe,
    string? PositionEn,
    string? PositionNe,
    string? DescriptionEn,
    string? DescriptionNe);

public record UpdatePersonProfileDto(
    string? Category,
    string? Name,
    string? Position,
    string? Description,
    string? ImageUrl,
    string? ExternalLink,
    int? SortOrder,
    JsonElement? IsActive,
    string? NameEn,
    string? NameNe,
    string? PositionEn,
    string? PositionNe,
    string? DescriptionEn,
    string? DescriptionNe);

public record SiteImageDto(
    int Id,
    string Category,
    string Title,
    string? Description,
    string ImageUrl,
    int SortOrder,
    bool IsActive,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    string? TitleEn,
    string? TitleNe,
    string? DescriptionEn,
    string? DescriptionNe);

public record CreateSiteImageDto(
    string Category,
    string Title,
    string? Description,
    string ImageUrl,
    int SortOrder,
    JsonElement? IsActive,
    string? TitleEn,
    string? TitleNe,
    string? DescriptionEn,
    string? DescriptionNe);

public record UpdateSiteImageDto(
    string? Category,
    string? Title,
    string? Description,
    string? ImageUrl,
    int? SortOrder,
    JsonElement? IsActive,
    string? TitleEn,
    string? TitleNe,
    string? DescriptionEn,
    string? DescriptionNe);
