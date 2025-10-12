// Persistence/Services/RolePageService.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Domain.Modals_DTO_;
using Persistence.Database;
using Persistence.Interfaces;

namespace Persistence.Services
{
    public class RolePageService : IRolePage
    {
        private readonly DbStudentRequestContext _context;

        public RolePageService(DbStudentRequestContext context)
        {
            _context = context;
        }

        /// <inheritdoc />
        public async Task<List<RolePageDetailDto>> GetRolePagePermissionsAsync(Guid roleId)
        {
            // Fetch all RolePage entries for the given role
            var rolePages = await _context.RolePages
                                          .Where(rp => rp.RoleId == roleId)
                                          .ToListAsync();

            // Group them by PageId and then select into the desired DTO format
            var result = rolePages
                .GroupBy(rp => rp.PageId) // Group by PageId
                .Select(g => new RolePageDetailDto
                {
                    PageId = g.Key ?? Guid.Empty, // Handle nullable PageId, provide a default if null
                    Permissions = g.Where(rp => rp.PermissionId.HasValue) // Filter out null PermissionIds
                                   .Select(rp => rp.PermissionId.Value)
                                   .ToList()
                })
                .ToList();

            return result;
        }

        /// <inheritdoc />
        public async Task UpdateRolePagePermissionsAsync(Guid roleId, List<RolePageDetailDto> incomingPagePermissions)
        {
            // 1. Fetch all existing RolePage entries for this role from the database
            var existingRolePages = await _context.RolePages
                                                  .Where(rp => rp.RoleId == roleId)
                                                  .ToListAsync();

            // Prepare lists for entities to add and remove
            var rolePagesToRemove = new List<RolePage>();
            var rolePagesToAdd = new List<RolePage>();

            // Use a HashSet for efficient lookup of incoming permissions
            // Key: PageId, Value: HashSet of PermissionIds for that Page
            var incomingPermissionsMap = new Dictionary<Guid, HashSet<Guid>>();
            foreach (var pagePermDto in incomingPagePermissions)
            {
                // CORRECTED: Removed .HasValue as PageId is Guid (non-nullable)
                if (pagePermDto.PageId == Guid.Empty) // Ensure PageId is valid
                {
                    // Skip if PageId is invalid (Guid.Empty typically means uninitialized)
                    continue;
                }
                incomingPermissionsMap[pagePermDto.PageId] = new HashSet<Guid>(pagePermDto.Permissions);
            }

            // Iterate through existing RolePage entries to identify those to remove
            foreach (var existingRp in existingRolePages)
            {
                // Check if the PageId from the existing entry is in the incoming map
                // Note: existingRp.PageId is nullable, so .HasValue is correct here.
                if (existingRp.PageId.HasValue && incomingPermissionsMap.TryGetValue(existingRp.PageId.Value, out var incomingPermsForPage))
                {
                    // If the PermissionId of the existing entry is NOT in the incoming set for that page, mark for removal
                    if (existingRp.PermissionId.HasValue && !incomingPermsForPage.Contains(existingRp.PermissionId.Value))
                    {
                        rolePagesToRemove.Add(existingRp);
                    }
                }
                else
                {
                    // If the PageId from the existing entry is not in the incoming map at all,
                    // it means this entire page's permissions should be removed for this role.
                    rolePagesToRemove.Add(existingRp);
                }
            }

            // Iterate through incoming page-permission DTOs to identify those to add
            foreach (var incomingPagePermDto in incomingPagePermissions)
            {
                // CORRECTED: Removed .HasValue as PageId is Guid (non-nullable)
                if (incomingPagePermDto.PageId == Guid.Empty)
                {
                    // Skip if PageId is invalid
                    continue;
                }

                var existingPermsForPage = new HashSet<Guid>(
                    existingRolePages
                        .Where(rp => rp.PageId == incomingPagePermDto.PageId && rp.PermissionId.HasValue)
                        .Select(rp => rp.PermissionId.Value)
                );

                foreach (var incomingPermissionId in incomingPagePermDto.Permissions)
                {
                    // If the incoming permission is NOT already existing for this page and role, mark for addition
                    if (!existingPermsForPage.Contains(incomingPermissionId))
                    {
                        rolePagesToAdd.Add(new RolePage
                        {
                            Id = Guid.NewGuid(), // Generate a new GUID for the primary key
                            RoleId = roleId,
                            PageId = incomingPagePermDto.PageId,
                            PermissionId = incomingPermissionId
                        });
                    }
                }
            }

            // Apply changes to the DbContext
            _context.RolePages.RemoveRange(rolePagesToRemove);
            _context.RolePages.AddRange(rolePagesToAdd);

            // Save all changes in a single transaction
            await _context.SaveChangesAsync();
        }
    }
}
