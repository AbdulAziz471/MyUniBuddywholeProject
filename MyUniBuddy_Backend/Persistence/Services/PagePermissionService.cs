using Domain.Entities;
using Domain.Modals_DTO_;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Services
{
    public class PagePermissionService : IPagePermission
    {
        private readonly DbStudentRequestContext _context;

        public PagePermissionService(DbStudentRequestContext context)
        {
            _context = context;
        }

        // Inside your PagePermissionService.cs (or similar service class)

        public async Task UpdatePagePermissionsAsync(Guid pageId, List<Guid> permissionIds)
        {
            // 1. Fetch all existing PagePermission entries for this page from the database
            // THIS IS THE CRITICAL LINE
            var existingPermissions = await _context.PagePermissions
                                                    .Where(pp => pp.PageId == pageId)
                                                    .ToListAsync();

            var existingPermissionIds = new HashSet<Guid>(existingPermissions.Select(pp => pp.PermissionId));
            var incomingPermissionIds = new HashSet<Guid>(permissionIds);

            // 2. Identify permissions to REMOVE:
            var permissionsToRemove = existingPermissions
                                            .Where(ep => !incomingPermissionIds.Contains(ep.PermissionId))
                                            .ToList();
            _context.PagePermissions.RemoveRange(permissionsToRemove);

            // 3. Identify permissions to ADD:
            var permissionsToAdd = new List<PagePermission>();
            foreach (var newPermissionId in incomingPermissionIds)
            {
                // If existingPermissionIds is empty (because the table is empty), this check will always be true
                // for any newPermissionId, leading to new PagePermission objects being created.
                if (!existingPermissionIds.Contains(newPermissionId))
                {
                    permissionsToAdd.Add(new PagePermission
                    {
                        PageId = pageId,
                        PermissionId = newPermissionId
                    });
                }
            }
            _context.PagePermissions.AddRange(permissionsToAdd);

            // 4. Save all changes
            await _context.SaveChangesAsync(); // <-- Error happens here
        }

        public async Task<List<PagePermissionDto>> GetPagePermissionsByPageIdAsync(Guid pageId)
        {
            return await _context.PagePermissions
                .Where(pp => pp.PageId == pageId)
                .Select(pp => new PagePermissionDto
                {
                    PageId = pp.PageId,
                    PermissionId = pp.PermissionId
                })
                .ToListAsync();
        }
        public async Task<List<PageWithPermissionsDto>> GetPagesWithAllPermissionsAsync()
        {
            return await _context.Pages
                                 // Include the junction table (PagePermissions)
                                 .Include(p => p.PagePermissions)
                                     // Then Include the actual Permission entity through the junction table
                                     .ThenInclude(pp => pp.Permission)
                                 .Select(p => new PageWithPermissionsDto
                                 {
                                     Id = p.Id,
                                     Title = p.Title,
                                     Key = p.Key,
                                     PageUrl = p.PageUrl,
                                     ParentPageId = p.ParentPageId,
                                     PreferenceOrder = p.PreferenceOrder,
                                     Description = p.Description,
                                     CreatedOn = p.CreatedOn,
                                     CreatedBy = p.CreatedBy,
                                     // Map the nested permissions
                                     Permissions = p.PagePermissions
                                                      .Where(pp => pp.Permission != null) // Ensure Permission is not null
                                                      .Select(pp => new PermissionDto
                                                      {
                                                          Id = pp.Permission.Id,
                                                          Title = pp.Permission.Title,
                                                          Description = pp.Permission.Description
                                                      })
                                                      .ToList()
                                 })
                                 .ToListAsync();
        }
    }

}