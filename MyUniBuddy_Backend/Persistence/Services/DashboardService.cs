using Domain.Modals_DTO_; // Ensure this namespace matches your DTO location
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Services
{
    public class DashboardService : IDashboard // Implementing the interface
    {
        private readonly DbStudentRequestContext _context;

        public DashboardService(DbStudentRequestContext context)
        {
            _context = context;
        }

        public async Task<List<PagesLayoutDto>> GetUserPagesAndPermissionsAsync(Guid userId)
        {
            // 1. Load user with all direct role-page-permission relationships
            var user = await _context.AspNetUsers
                .Include(u => u.Roles)
                    .ThenInclude(r => r.RolePages)
                        .ThenInclude(rp => rp.Page)
                .Include(u => u.Roles)
                    .ThenInclude(r => r.RolePages)
                        .ThenInclude(rp => rp.Permission)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return new List<PagesLayoutDto>();
            }

            // 2. Collect all unique pages directly linked to user's roles AND their associated permissions
            var directlyAccessiblePageDetails = new Dictionary<Guid, (Domain.Entities.Page Page, List<PermissionLayoutDto> Permissions)>();

            foreach (var role in user.Roles)
            {
                foreach (var rolePage in role.RolePages)
                {
                    if (rolePage.Page != null && rolePage.Page.Id != Guid.Empty)
                    {
                        if (!directlyAccessiblePageDetails.ContainsKey(rolePage.Page.Id))
                        {
                            directlyAccessiblePageDetails[rolePage.Page.Id] = (rolePage.Page, new List<PermissionLayoutDto>());
                        }

                        if (rolePage.Permission != null && !string.IsNullOrEmpty(rolePage.Permission.Title))
                        {
                            var existingPermissions = directlyAccessiblePageDetails[rolePage.Page.Id].Permissions;
                            if (!existingPermissions.Any(p => p.PermissionType == rolePage.Permission.Title))
                            {
                                existingPermissions.Add(new PermissionLayoutDto
                                {
                                    PermissionType = rolePage.Permission.Title,
                                    IsAllowed = true
                                });
                            }
                        }
                    }
                }
            }

            // 3. Identify all unique page IDs that need to be in the hierarchy (direct + all parents)
            var allRelevantPageIds = new HashSet<Guid>(directlyAccessiblePageDetails.Keys);

            // Recursively find all parent IDs
            var parentIdsToFetch = new HashSet<Guid>();
            foreach (var pageId in directlyAccessiblePageDetails.Keys)
            {
                var currentPage = directlyAccessiblePageDetails[pageId].Page;
                Guid? currentParentId = currentPage.ParentPageId;

                while (currentParentId.HasValue && !allRelevantPageIds.Contains(currentParentId.Value) && !parentIdsToFetch.Contains(currentParentId.Value))
                {
                    parentIdsToFetch.Add(currentParentId.Value);
                    // To avoid infinite loops for malformed data
                    if (parentIdsToFetch.Count > 1000) break; // Safeguard

                    // Fetch parent page to get its parentId for next iteration (optimized below)
                    // For now, assume this will be handled by loading all pages
                    currentParentId = null; // Will be replaced by loading all pages
                }
            }

            // 4. Load all identified pages (direct + all parents) in a single query for efficiency
            var allPagesInHierarchy = await _context.Pages
                .Where(p => allRelevantPageIds.Contains(p.Id) || parentIdsToFetch.Contains(p.Id))
                .AsNoTracking() // Read-only operation
                .ToListAsync();

            // Rebuild allRelevantPageIds and convert to a dictionary for faster lookups
            allRelevantPageIds.Clear();
            var allPagesMap = allPagesInHierarchy.ToDictionary(p => p.Id);
            foreach (var pageId in allPagesInHierarchy.Select(p => p.Id))
            {
                allRelevantPageIds.Add(pageId);
            }

            // Ensure all parent pages are correctly added to 'allRelevantPageIds' by traversing from loaded pages
            foreach (var page in allPagesInHierarchy)
            {
                Guid? currentParentId = page.ParentPageId;
                while (currentParentId.HasValue && !allRelevantPageIds.Contains(currentParentId.Value))
                {
                    if (allPagesMap.TryGetValue(currentParentId.Value, out var parentPage))
                    {
                        allRelevantPageIds.Add(parentPage.Id);
                        currentParentId = parentPage.ParentPageId;
                    }
                    else
                    {
                        // Parent exists in DB but wasn't initially loaded, fetch it
                        var missingParent = await _context.Pages.AsNoTracking().FirstOrDefaultAsync(p => p.Id == currentParentId.Value);
                        if (missingParent != null)
                        {
                            allPagesInHierarchy.Add(missingParent);
                            allPagesMap[missingParent.Id] = missingParent;
                            allRelevantPageIds.Add(missingParent.Id);
                            currentParentId = missingParent.ParentPageId;
                        }
                        else
                        {
                            break; // Parent not found, stop
                        }
                    }
                }
            }


            // Filter allPagesInHierarchy to only include pages that are part of the desired set
            // And order them for the hierarchy building
            var orderedPagesForHierarchy = allPagesInHierarchy
                .Where(p => allRelevantPageIds.Contains(p.Id) && p.Id != Guid.Empty) // Final filter
                .OrderBy(p => p.PreferenceOrder)
                .ToList();

            // Recursive function to build page layout
            List<PagesLayoutDto> BuildHierarchy(Guid? parentId)
            {
                return orderedPagesForHierarchy
                    .Where(p => p.ParentPageId == parentId)
                    .Select(p =>
                    {
                        List<PermissionLayoutDto>? permissions = null;
                        if (directlyAccessiblePageDetails.TryGetValue(p.Id, out var pageDetails))
                        {
                            permissions = pageDetails.Permissions;
                        }

                        return new PagesLayoutDto
                        {
                            Id = p.Id,
                            Title = p.Title,
                            Key = p.Key,
                            PageUrl = p.PageUrl,
                            ParentPageId = p.ParentPageId,
                            PreferenceOrder = p.PreferenceOrder,
                            Permission = permissions?.Any() == true ? permissions : null,
                            SubPages = BuildHierarchy(p.Id)
                        };
                    })
                    .ToList();
            }

            return BuildHierarchy(null); // Start building from the root
        }



      


    }
}
    




