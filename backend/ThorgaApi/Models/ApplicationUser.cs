using Microsoft.AspNetCore.Identity;

namespace ThorgaApi.Models;

public class ApplicationUser : IdentityUser
{
    public string? FullName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<Member> Members { get; set; } = new List<Member>();
}
