using System.Security.Claims;

namespace ThorgaApi.Authorization;

public static class PermissionHelper
{
    public static bool UserHasPermission(ClaimsPrincipal user, string permission)
    {
        if (user is null)
        {
            return false;
        }

        if (user.IsInRole("admin") || user.IsInRole("superadmin"))
        {
            return true;
        }

        var permissions = user.Claims
            .Where(claim => claim.Type == "permissions")
            .SelectMany(claim => claim.Value.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        return permissions.Contains(permission);
    }
}
