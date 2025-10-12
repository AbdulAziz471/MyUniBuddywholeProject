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
    public class ChangePasswordService : IChangePassword
    {
        private readonly DbStudentRequestContext _context;


        public ChangePasswordService(DbStudentRequestContext context)
        {
            _context = context;

        }
        public async Task ChangePassword(Guid id, UserChangePasswordDto dto)
        {
            // Validate input
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }

            if (string.IsNullOrWhiteSpace(dto.OldPassword) ||
                string.IsNullOrWhiteSpace(dto.NewPassword) ||
                string.IsNullOrWhiteSpace(dto.ConfirmPassword))
            {
                throw new ArgumentException("All password fields are required.");
            }

            if (dto.NewPassword != dto.ConfirmPassword)
            {
                throw new ArgumentException("New password and confirm password do not match.");
            }

            // Find the user by ID
            var user = await _context.AspNetUsers
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            // Verify old password
            if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.PasswordHash))
            {
                throw new Exception("Current password is incorrect.");
            }

            // Update password
            user.PasswordHash = HashPassword(dto.NewPassword);

            // Update security stamp for added security
            user.SecurityStamp = Guid.NewGuid().ToString();

            // Save the updated user in the database
            await _context.SaveChangesAsync();
        }
        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password); // Install BCrypt.Net-Next via NuGet
        }
    }
}

