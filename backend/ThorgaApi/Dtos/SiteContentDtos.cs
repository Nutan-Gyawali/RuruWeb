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
    DateTime UpdatedAt);

public record CreateSiteContentDto(
    string Category,
    string Title,
    string Body,
    string? Summary,
    int SortOrder,
    JsonElement? IsActive);

public record UpdateSiteContentDto(
    string? Category,
    string? Title,
    string? Body,
    string? Summary,
    int? SortOrder,
    JsonElement? IsActive);

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
    DateTime UpdatedAt);

public record CreatePersonProfileDto(
    string Category,
    string Name,
    string? Position,
    string? Description,
    string? ImageUrl,
    string? ExternalLink,
    int SortOrder,
    JsonElement? IsActive);

public record UpdatePersonProfileDto(
    string? Category,
    string? Name,
    string? Position,
    string? Description,
    string? ImageUrl,
    string? ExternalLink,
    int? SortOrder,
    JsonElement? IsActive);

public record SiteImageDto(
    int Id,
    string Category,
    string Title,
    string? Description,
    string ImageUrl,
    int SortOrder,
    bool IsActive,
    DateTime CreatedAt,
    DateTime UpdatedAt);

public record CreateSiteImageDto(
    string Category,
    string Title,
    string? Description,
    string ImageUrl,
    int SortOrder,
    JsonElement? IsActive);

public record UpdateSiteImageDto(
    string? Category,
    string? Title,
    string? Description,
    string? ImageUrl,
    int? SortOrder,
    JsonElement? IsActive);
