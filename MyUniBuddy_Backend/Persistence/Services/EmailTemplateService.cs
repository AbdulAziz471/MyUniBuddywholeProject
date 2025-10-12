using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence.Database;
using Persistence.Interfaces;

namespace Persistence.Services
{
    public class EmailTemplateService : IEmailTemplate
    {
        private readonly DbStudentRequestContext _context;
        private readonly ILogger<EmailTemplateService> _logger;

        public EmailTemplateService(DbStudentRequestContext context, ILogger<EmailTemplateService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<EmailTemplate>> GetAllAsync()
        {
            try
            {
                return await _context.EmailTemplates.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all email templates");
                throw;
            }
        }

        public async Task<EmailTemplate> GetByIdAsync(Guid id)
        {
            try
            {
                var template = await _context.EmailTemplates.FindAsync(id);
                if (template == null)
                    throw new Exception("Email template not found");
                return template;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching email template with ID: {Id}", id);
                throw;
            }
        }

        public async Task<EmailTemplate> GetByNameAsync(string name)
        {
            try
            {
                var template = await _context.EmailTemplates.FirstOrDefaultAsync(t => t.Name == name);
                if (template == null)
                    throw new Exception($"Email template '{name}' not found");
                return template;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching email template by name: {Name}", name);
                throw;
            }
        }

        public async Task<EmailTemplate> CreateAsync(EmailTemplate emailTemplate)
        {
            try
            {
                if (emailTemplate == null)
                    throw new ArgumentNullException(nameof(emailTemplate));

                emailTemplate.Id = Guid.NewGuid();
                emailTemplate.CreatedOn = DateTime.UtcNow;
                emailTemplate.UpdatedOn = null;

                _context.EmailTemplates.Add(emailTemplate);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Created new email template with ID: {Id} and Name: {Name}", emailTemplate.Id, emailTemplate.Name);
                return emailTemplate;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating email template");
                throw;
            }
        }

        public async Task<EmailTemplate> UpdateAsync(Guid id, EmailTemplate emailTemplate)
        {
            try
            {
                if (emailTemplate == null)
                    throw new ArgumentNullException(nameof(emailTemplate));

                var existingTemplate = await _context.EmailTemplates.FindAsync(id)
                    ?? throw new Exception("Email template not found");

                existingTemplate.Name = emailTemplate.Name;
                existingTemplate.SubjectTemplate = emailTemplate.SubjectTemplate;
                existingTemplate.BodyTemplate = emailTemplate.BodyTemplate;
                existingTemplate.IsHtml = emailTemplate.IsHtml;
                existingTemplate.UpdatedOn = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                _logger.LogInformation("Updated email template with ID: {Id}", id);
                return existingTemplate;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating email template with ID: {Id}", id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                var template = await _context.EmailTemplates.FindAsync(id);
                if (template == null)
                {
                    _logger.LogWarning("Email template not found for deletion with ID: {Id}", id);
                    return false;
                }

                _context.EmailTemplates.Remove(template);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Deleted email template with ID: {Id}", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting email template with ID: {Id}", id);
                throw;
            }
        }
    }
}