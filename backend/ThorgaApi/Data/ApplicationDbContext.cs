using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ThorgaApi.Models;

namespace ThorgaApi.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Member> Members => Set<Member>();
    public DbSet<SiteContent> SiteContents => Set<SiteContent>();
    public DbSet<PersonProfile> PersonProfiles => Set<PersonProfile>();
    public DbSet<SiteImage> SiteImages => Set<SiteImage>();
    public DbSet<SiteRolePermission> SiteRolePermissions => Set<SiteRolePermission>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Member>(entity =>
        {
            entity.HasIndex(m => m.Email).IsUnique();
            entity.HasOne(m => m.User)
                .WithMany(u => u.Members)
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        builder.Entity<SiteContent>(entity =>
        {
            entity.HasIndex(x => new { x.Category, x.Title }).IsUnique(false);
        });

        builder.Entity<PersonProfile>(entity =>
        {
            entity.HasIndex(x => new { x.Category, x.Name }).IsUnique(false);
        });

        builder.Entity<SiteImage>(entity =>
        {
            entity.HasIndex(x => new { x.Category, x.Title }).IsUnique(false);
        });
    }
}
