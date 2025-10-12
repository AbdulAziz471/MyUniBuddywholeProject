using Domain.Entities;
using Domain.Modals_DTO_;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Persistence.Database;
using Persistence.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
namespace Persistence.Services
{


    public class AuthService : IAuth
    {
        private readonly DbStudentRequestContext _context;  
        private readonly IConfiguration _configuration;

        public AuthService(DbStudentRequestContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        public async Task<LoginResponseDto> LoginAsync(LoginDto model)
        {
            var user = await _context.AspNetUsers
                .Include(u => u.Roles)
                    .ThenInclude(r => r.AspNetRoleClaims)
                .FirstOrDefaultAsync(u => u.Email == model.Email);

            if (user == null)
                throw new UnauthorizedAccessException("Invalid email or password");

            bool passwordMatch = BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash);
            if (!passwordMatch)
                throw new UnauthorizedAccessException("Invalid email or password");

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
        new Claim(ClaimTypes.Email, user.Email ?? string.Empty)
    };

            foreach (var role in user.Roles)
            {
                if (!string.IsNullOrEmpty(role.Name))
                    claims.Add(new Claim(ClaimTypes.Role, role.Name));

                foreach (var roleClaim in role.AspNetRoleClaims)
                {
                    if (!string.IsNullOrEmpty(roleClaim.ClaimType) && !string.IsNullOrEmpty(roleClaim.ClaimValue))
                        claims.Add(new Claim(roleClaim.ClaimType, roleClaim.ClaimValue));
                }
            }

            var userClaims = await _context.AspNetUserClaims
                .Where(c => c.UserId == user.Id)
                .ToListAsync();

            foreach (var claim in userClaims)
            {
                if (!string.IsNullOrEmpty(claim.ClaimType) && !string.IsNullOrEmpty(claim.ClaimValue))
                    claims.Add(new Claim(claim.ClaimType, claim.ClaimValue));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiresInMinutes"] ?? "60")),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return new LoginResponseDto
            {
                Token = tokenString,
                UserId = user.Id,
                Email = user.Email ?? string.Empty,
                UserName = user.UserName ?? string.Empty,
                Role = string.Join(",", user.Roles.Select(r => r.Name))
            };
        }


        public async Task<Guid> RegistorAsync(RegistorDto dto)
        {
            
            var userName = dto.FullName;
            var email = dto.Email;

            // 2. Check if user already exists (using UserName or Email)
            var existing = await _context.AspNetUsers
                .FirstOrDefaultAsync(u => u.Email == email || u.UserName == userName);

            if (existing != null)
                throw new Exception("User already exists.");

            // 3. Find the "Student" Role ID
            // Assuming you have a constant or a known string for the Student role name
            const string studentRoleName = "Student";
            var studentRole = await _context.AspNetRoles
                .FirstOrDefaultAsync(r => r.NormalizedName == studentRoleName.ToUpperInvariant());

            if (studentRole == null)
            {
                // Handle case where the mandatory "Student" role doesn't exist
                throw new Exception($"Mandatory role '{studentRoleName}' not found.");
            }

            // 4. Create the new AspNetUser
            var user = new AspNetUser
            {
                Id = Guid.NewGuid(),
                UserName = userName,
                NormalizedUserName = userName.ToUpperInvariant(),
                Email = email,
                NormalizedEmail = email.ToUpperInvariant(),
                EmailConfirmed = true,
                // Assuming HashPassword is a method available in your service
                PasswordHash = HashPassword(dto.Password),
                PhoneNumber = null,
                PhoneNumberConfirmed = false,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                TwoFactorEnabled = false,
                LockoutEnabled = false,
                AccessFailedCount = 0
            };

            _context.AspNetUsers.Add(user);

            // 5. Assign the "Student" role
            // Assign roles using the navigation property
            user.Roles.Add(studentRole); // This adds the AspNetRole object to the user's collection in memory.

            // 6. Commit changes
            await _context.SaveChangesAsync();
            return user.Id;
        }



        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password); // Install BCrypt.Net-Next via NuGet
        }

    }
}
