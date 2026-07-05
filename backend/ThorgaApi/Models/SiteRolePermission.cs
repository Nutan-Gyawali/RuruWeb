namespace ThorgaApi.Models;

public class SiteRolePermission
{
    public int Id { get; set; }
    public string RoleName { get; set; } = string.Empty;
    public string Permission { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
