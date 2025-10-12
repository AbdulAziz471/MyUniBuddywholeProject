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
    public class AdminUserService : IAdminUser
    {
        private readonly DbStudentRequestContext _context;

        public AdminUserService(DbStudentRequestContext context)
        {
            _context = context;
        }

        public async Task<Guid> CreateAdminUserAsync(UserCreateDto dto)
        {
            // Check if user already exists
            var existing = await _context.AspNetUsers
                .FirstOrDefaultAsync(u => u.Email == dto.Email || u.UserName == dto.UserName);

            if (existing != null)
                throw new Exception("User already exists.");

            var user = new AspNetUser
            {
                Id = Guid.NewGuid(),
                UserName = dto.UserName,
                NormalizedUserName = dto.UserName?.ToUpperInvariant(),
                Email = dto.Email,
                NormalizedEmail = dto.Email?.ToUpperInvariant(),
                EmailConfirmed = true,
                PasswordHash = HashPassword(dto.Password),
                PhoneNumber = dto.PhoneNumber,
                PhoneNumberConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                TwoFactorEnabled = false,
                LockoutEnabled = false,
                AccessFailedCount = 0
            };

            _context.AspNetUsers.Add(user); // User is added to the context, but not yet saved to the database.

            // Validate and assign roles
            if (dto.RoleIds != null && dto.RoleIds.Any())
            {
                var validRoles = await _context.AspNetRoles
                    .Where(r => dto.RoleIds.Contains(r.Id))
                    .ToListAsync();

                var invalidRoleIds = dto.RoleIds.Except(validRoles.Select(r => r.Id)).ToList();
                if (invalidRoleIds.Any())
                {
                    throw new Exception($"Invalid role ID(s): {string.Join(", ", invalidRoleIds)}");
                }

                // Assign roles using the navigation property
                foreach (var role in validRoles)
                {
                    user.Roles.Add(role); // Roles are added to the user's navigation property in memory.
                }
            }

            await _context.SaveChangesAsync(); // This is where all changes are committed to the database.
            return user.Id;
        }

        public async Task<UserDto?> GetByIdAsync(Guid id)
        {
            return await _context.AspNetUsers
                .Include(u => u.Roles) // Directly include the 'Roles' navigation property
                .Where(u => u.Id == id)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    UserName = u.UserName,
                    PhoneNumber = u.PhoneNumber,
                    Roles = u.Roles // Access the roles directly from the AspNetUser.Roles collection
                        .Select(r => new UserRoleDto // Map to UserRoleDto as defined in your DTOs
                        {
                            Id = r.Id,
                            Name = r.Name! // Assuming Name is not null
                        }).ToList()
                }).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            return await _context.AspNetUsers
                .Include(u => u.Roles)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    UserName = u.UserName,
                    PhoneNumber = u.PhoneNumber,
                    Roles = u.Roles 
                        .Select(r => new UserRoleDto 
                        {
                            Id = r.Id,
                            Name = r.Name! // Assuming Name is not null
                        }).ToList()
                }).ToListAsync(); // This ToListAsync() executes the entire query
        }
        public async Task UpdateAdminUserAsync(Guid id, UserUpdateDto dto)
        {
            // Find the user by ID
            var user = await _context.AspNetUsers
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                throw new Exception("User not found.");
            }
            user.UserName = dto.UserName ?? user.UserName;
            user.Email = dto.Email ?? user.Email;
            user.PhoneNumber = dto.PhoneNumber ?? user.PhoneNumber;

            // Update roles
            if (dto.RoleIds != null && dto.RoleIds.Any())
            {
                // Get the roles from the database
                var validRoles = await _context.AspNetRoles
                    .Where(r => dto.RoleIds.Contains(r.Id))
                    .ToListAsync();

                // Ensure all provided roles are valid
                var invalidRoleIds = dto.RoleIds.Except(validRoles.Select(r => r.Id)).ToList();
                if (invalidRoleIds.Any())
                {
                    throw new Exception($"Invalid role ID(s): {string.Join(", ", invalidRoleIds)}");
                }

                // Clear the existing roles
                user.Roles.Clear();

                // Assign new roles
                foreach (var role in validRoles)
                {
                    user.Roles.Add(role); // Add the actual AspNetRole object to the user's Roles collection
                }
            }

            // Save the updated user in the database
            await _context.SaveChangesAsync();
        }


        public async Task DeleteAdminUserAsync(Guid id)
        {
            // Find the user by ID
            var user = await _context.AspNetUsers
                .Include(u => u.Roles) // Optionally include roles to handle any dependencies
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            // Remove the user from the context
            _context.AspNetUsers.Remove(user);

            // Save changes to the database
            await _context.SaveChangesAsync();
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password); // Install BCrypt.Net-Next via NuGet
        }
    }
}