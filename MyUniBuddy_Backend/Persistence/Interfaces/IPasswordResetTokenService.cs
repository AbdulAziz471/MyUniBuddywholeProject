using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IPasswordResetTokenService
    {
        Task<string> GenerateAndSaveTokenAsync(string email);
        Task<bool> ValidateTokenAsync(string email, string token);
        Task InvalidateTokenAsync(string token);
    }
}
