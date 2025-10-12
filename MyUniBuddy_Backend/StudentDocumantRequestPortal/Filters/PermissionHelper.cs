using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace StudentDocumantRequestPortal.Filters
{
    public static class PermissionHelper
    {
        public static bool HasPermission(List<AspNetRole> roles, string pageName, string permissionType)
        {
            // Iterate through the roles that the user has.
            foreach (var role in roles)
            {
                // Iterate through the role pages to find the page and permission
                foreach (var rolePage in role.RolePages)
                {
                    if (rolePage.Page != null && rolePage.Page.Key.Equals(pageName, StringComparison.OrdinalIgnoreCase))
                    {
                        // Check if the page has the required permission
                        if (rolePage.Permission != null && rolePage.Permission.Title.Equals(permissionType, StringComparison.OrdinalIgnoreCase))
                        {
                            return true; // Permission found
                        }
                    }
                }
            }
            return false; // Permission not found
        }
    }

}
