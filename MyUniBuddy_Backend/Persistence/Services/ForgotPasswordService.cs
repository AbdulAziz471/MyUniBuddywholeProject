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
    public class ForgotPasswordService : IForgotPasswordService
    {
        private readonly DbStudentRequestContext _context;
        private readonly IEmail _emailService;
        private readonly IPasswordResetTokenService _tokenService;
        private readonly IChangePassword _changePasswordService;
        // You'll need to inject the URL for your frontend application
        private readonly string _clientBaseUrl = "http://localhost:8080";

        public ForgotPasswordService(IEmail emailService, IPasswordResetTokenService tokenService, IChangePassword changePasswordService)
        {
            _emailService = emailService;
            _tokenService = tokenService;
            _changePasswordService = changePasswordService;
        }

        public async Task SendPasswordResetLinkAsync(string email)
        {
            var token = await _tokenService.GenerateAndSaveTokenAsync(email);
            var resetLink = $"{_clientBaseUrl}/reset-password?token={token}"; // Construct the URL

            var subject = "Password Reset Request";
            var body = $"Please click the following link to reset your password: <a href='{resetLink}'>Reset Password</a>";
            await _emailService.SendEmailAsync(email, subject, body, isHtml: true);
        }

        public async Task ResetPasswordAsync(string email, string token, string newPassword)
        {
            var isValid = await _tokenService.ValidateTokenAsync(email, token);
            if (!isValid)
            {
                throw new ArgumentException("Invalid or expired password reset token.");
            }

            // Find the user and update the password
            var user = await _context.AspNetUsers.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                throw new Exception("User not found.");
            }

            // Use your existing password hashing logic
            user.PasswordHash = HashPassword(newPassword);

            // Update security stamp for added security
            user.SecurityStamp = Guid.NewGuid().ToString();

            await _context.SaveChangesAsync();
            await _tokenService.InvalidateTokenAsync(token); // Invalidate token after use
        }
        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}