using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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

    public async Task InitializeDatabaseAsync(IServiceProvider serviceProvider, IConfiguration configuration)
    {
        await Database.MigrateAsync();

        using var scope = serviceProvider.CreateScope();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        foreach (var roleName in new[] { "admin", "superadmin", "executive members", "general members" })
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        var adminEmail = configuration["Admin:Email"] ?? "admin@thorga.com";
        var adminPassword = configuration["Admin:Password"] ?? "Admin@123456";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);
        if (adminUser is null)
        {
            adminUser = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                FullName = "System Administrator",
                CreatedAt = DateTime.UtcNow
            };

            var created = await userManager.CreateAsync(adminUser, adminPassword);
            if (created.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "admin");
            }
        }
        else if (!await userManager.IsInRoleAsync(adminUser, "admin"))
        {
            await userManager.AddToRoleAsync(adminUser, "admin");
        }
    }

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
