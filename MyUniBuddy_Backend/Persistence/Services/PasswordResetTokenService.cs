// Persistence/Services/PasswordResetTokenService.cs
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Interfaces;
using Domain.Entities; // Assuming you have an entity for PasswordResetToken
using System;
using System.Threading.Tasks;

public class PasswordResetTokenService : IPasswordResetTokenService
{
    private readonly DbStudentRequestContext _context;

    public PasswordResetTokenService(DbStudentRequestContext context)
    {
        _context = context;
    }

    public async Task<string> GenerateAndSaveTokenAsync(string email)
    {
        var user = await _context.AspNetUsers.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            throw new Exception("User not found.");
        }

        // Invalidate any existing tokens for the user to prevent multiple valid links
        var existingTokens = await _context.PasswordResetTokens
            .Where(t => t.UserId == user.Id)
            .ToListAsync();
        _context.PasswordResetTokens.RemoveRange(existingTokens);
        await _context.SaveChangesAsync();

        // Generate a cryptographically secure token
        var token = Guid.NewGuid().ToString("N");
        var expiration = DateTime.UtcNow.AddMinutes(30); // Token expires in 30 minutes

        var passwordResetToken = new PasswordResetToken
        {
            Id = Guid.NewGuid(),
            Token = token,
            UserId = user.Id,
            CreatedAt = DateTime.UtcNow,
            ExpiresAt = expiration
        };

        await _context.PasswordResetTokens.AddAsync(passwordResetToken);
        await _context.SaveChangesAsync();

        return token;
    }

    public async Task<bool> ValidateTokenAsync(string email, string token)
    {
        var user = await _context.AspNetUsers.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            return false;
        }

        var passwordResetToken = await _context.PasswordResetTokens
            .FirstOrDefaultAsync(t => t.UserId == user.Id && t.Token == token);

        if (passwordResetToken == null || passwordResetToken.ExpiresAt < DateTime.UtcNow)
        {
            return false; // Token not found or expired
        }

        return true;
    }

    public async Task InvalidateTokenAsync(string token)
    {
        var passwordResetToken = await _context.PasswordResetTokens
            .FirstOrDefaultAsync(t => t.Token == token);
        if (passwordResetToken != null)
        {
            _context.PasswordResetTokens.Remove(passwordResetToken);
            await _context.SaveChangesAsync();
        }
    }
}