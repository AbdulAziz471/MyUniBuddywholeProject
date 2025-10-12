using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;

namespace Persistence.Interfaces
{
    public interface ISmtpSetting
    {
        Task<IEnumerable<SmtpSetting>> GetAllAsync();
        Task<SmtpSetting> GetByIdAsync(Guid id);
        Task<SmtpSetting> CreateAsync(SmtpSetting smtpSetting);
        Task<SmtpSetting> UpdateAsync(Guid id, SmtpSetting smtpSetting);
        Task<bool> DeleteAsync(Guid id);
       }
}