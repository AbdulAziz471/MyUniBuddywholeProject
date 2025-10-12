// Persistence/Services/PermissionService.cs
using Domain.Entities;
using Domain.Modals_DTO_;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Services
{
    public class PermissionService : IPermission 
    {
        private readonly DbStudentRequestContext _context;

        public PermissionService(DbStudentRequestContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retrieves all permissions from the database.
        /// </summary>
        /// <returns>A collection of PermissionDto objects.</returns>
        public async Task<IEnumerable<PermissionDto>> GetAllPermissionsAsync()
        {
            return await _context.Permissions
                .AsNoTracking() // Use AsNoTracking for read-only operations to improve performance
                .Select(p => new PermissionDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    CreatedOn = p.CreatedOn,
                    CreatedBy = p.CreatedBy
                })
                .ToListAsync();
        }

        /// <summary>
        /// Retrieves a specific permission by its ID.
        /// </summary>
        /// <param name="id">The ID (Guid) of the permission to retrieve.</param>
        /// <returns>The PermissionDto if found, otherwise null.</returns>
        public async Task<PermissionDto> GetPermissionByIdAsync(Guid id) // Parameter type is Guid
        {
            var permission = await _context.Permissions
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (permission == null)
            {
                return null;
            }

            return new PermissionDto
            {
                Id = permission.Id,
                Title = permission.Title,
                Description = permission.Description,
                CreatedOn = permission.CreatedOn,
                CreatedBy = permission.CreatedBy
            };
        }

        /// <summary>
        /// Creates a new permission in the database.
        /// </summary>
        /// <param name="permissionDto">The DTO containing data for the new permission.</param>
        /// <returns>The created PermissionDto.</returns>
        public async Task<PermissionDto> CreatePermissionAsync(CreatePermissionDto permissionDto)
        {
            var permission = new Permission
            {
                Id = Guid.NewGuid(), // Generate a new GUID for the Id
                Title = permissionDto.Title,
                Description = permissionDto.Description,
                CreatedBy = permissionDto.CreatedBy // Set created by user
            };

            _context.Permissions.Add(permission);
            await _context.SaveChangesAsync();

            // Return the newly created permission as a DTO
            return new PermissionDto
            {
                Id = permission.Id,
                Title = permission.Title,
                Description = permission.Description,
                CreatedOn = permission.CreatedOn,
                CreatedBy = permission.CreatedBy
            };
        }

        /// <summary>
        /// Updates an existing permission in the database.
        /// </summary>
        /// <param name="id">The ID (Guid) of the permission to update.</param>
        /// <param name="permissionDto">The DTO containing updated data.</param>
        /// <returns>True if the update was successful, otherwise false.</returns>
        public async Task<bool> UpdatePermissionAsync(Guid id, UpdatePermissionDto permissionDto) // Parameter type is Guid
        {
            var permission = await _context.Permissions.FindAsync(id);

            if (permission == null)
            {
                return false;
            }

            permission.Title = permissionDto.Title;
            permission.Description = permissionDto.Description;
            // You might add an UpdatedOn/UpdatedBy field here if your entity has it.

            _context.Entry(permission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await PermissionExists(id))
                {
                    return false;
                }
                else
                {
                    throw; // Re-throw if it's a different concurrency issue
                }
            }
            return true;
        }

        /// <summary>
        /// Deletes a permission from the database by its ID.
        /// </summary>
        /// <param name="id">The ID (Guid) of the permission to delete.</param>
        /// <returns>True if the deletion was successful, otherwise false.</returns>
        public async Task<bool> DeletePermissionAsync(Guid id) // Changed parameter type to Guid
        {
            var permission = await _context.Permissions.FindAsync(id);
            if (permission == null)
            {
                return false;
            }

            _context.Permissions.Remove(permission);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Checks if a permission with the given ID (Guid) exists.
        /// </summary>
        /// <param name="id">The ID (Guid) of the permission.</param>
        /// <returns>True if the permission exists, otherwise false.</returns>
        private async Task<bool> PermissionExists(Guid id) // Parameter type is Guid
        {
            return await _context.Permissions.AnyAsync(e => e.Id == id);
        }
    }
}
