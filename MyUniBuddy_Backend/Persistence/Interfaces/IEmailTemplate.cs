using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IEmailTemplate
    {
        Task<EmailTemplate> GetByNameAsync(string name);
        Task<EmailTemplate> GetByIdAsync(Guid id);
        Task<IEnumerable<EmailTemplate>> GetAllAsync();
        Task<EmailTemplate> CreateAsync(EmailTemplate template);
        Task<EmailTemplate> UpdateAsync(Guid id, EmailTemplate template);
        Task<bool> DeleteAsync(Guid id);
    }
}
