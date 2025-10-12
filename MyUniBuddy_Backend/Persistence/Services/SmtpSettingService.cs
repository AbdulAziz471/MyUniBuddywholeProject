using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Services
{
    public class SmtpSettingService : ISmtpSetting
    {
        private readonly DbStudentRequestContext _context;
        private readonly ILogger<SmtpSettingService> _logger;
       

        public SmtpSettingService(DbStudentRequestContext context, ILogger<SmtpSettingService> logger)
        {
            _context = context;
            _logger = logger;
         }

        public async Task<IEnumerable<SmtpSetting>> GetAllAsync()
        {
            try
            {
                return await _context.SmtpSettings.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all SMTP settings");
                throw;
            }
        }

        public async Task<SmtpSetting> GetByIdAsync(Guid id)
        {
            try
            {
                var setting = await _context.SmtpSettings.FindAsync(id);
                if (setting == null)
                    throw new Exception("SMTP setting not found");
                return setting;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching SMTP setting with ID: {Id}", id);
                throw;
            }
        }

        public async Task<SmtpSetting> CreateAsync(SmtpSetting smtpSetting)
        {
            try
            {
                if (smtpSetting == null)
                    throw new ArgumentNullException(nameof(smtpSetting));

                smtpSetting.Id = Guid.NewGuid();
                smtpSetting.CreatedOn = DateTime.Now;
                smtpSetting.UpdatedOn = DateTime.Now;

                _context.SmtpSettings.Add(smtpSetting);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Created new SMTP setting with ID: {Id}", smtpSetting.Id);
                return smtpSetting;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating SMTP setting");
                throw;
            }
        }

        public async Task<SmtpSetting> UpdateAsync(Guid id, SmtpSetting smtpSetting)
        {
            try
            {
                if (smtpSetting == null)
                    throw new ArgumentNullException(nameof(smtpSetting));

                var existingSetting = await _context.SmtpSettings.FindAsync(id)
                    ?? throw new Exception("SMTP setting not found");

                existingSetting.SmtpServer = smtpSetting.SmtpServer;
                existingSetting.Port = smtpSetting.Port;
                existingSetting.Username = smtpSetting.Username;
                existingSetting.Password = smtpSetting.Password;
                existingSetting.EnableSsl = smtpSetting.EnableSsl;
                existingSetting.IsDefault = smtpSetting.IsDefault;
                existingSetting.UpdatedOn = DateTime.Now;

                await _context.SaveChangesAsync();
                _logger.LogInformation("Updated SMTP setting with ID: {Id}", id);
                return existingSetting;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating SMTP setting with ID: {Id}", id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                var setting = await _context.SmtpSettings.FindAsync(id);
                if (setting == null)
                {
                    _logger.LogWarning("SMTP setting not found for deletion with ID: {Id}", id);
                    return false;
                }

                _context.SmtpSettings.Remove(setting);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Deleted SMTP setting with ID: {Id}", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting SMTP setting with ID: {Id}", id);
                throw;
            }
        }

        
    }
}