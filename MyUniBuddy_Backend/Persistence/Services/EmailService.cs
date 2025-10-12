using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.Extensions.Logging;
using Persistence.Interfaces;

namespace Persistence.Services
{
    public class EmailService: IEmail

    {
        private readonly ISmtpSetting _smtpSetting;
        private readonly ILogger<EmailService> _logger;

        public EmailService(ISmtpSetting smtpSetting, ILogger<EmailService> logger)
        {
            _smtpSetting = smtpSetting;
            _logger = logger;
        }
        public async Task SendEmailAsync(string toEmail, string subject, string body, bool isHtml = false)
        {
            try
            {
                // Fetch the default SMTP setting (or the first one if no default)
                var smtpSettings = await _smtpSetting.GetAllAsync();
                var defaultSetting = smtpSettings.FirstOrDefault(s => s.IsDefault) ?? smtpSettings.FirstOrDefault();

                if (defaultSetting == null)
                {
                    throw new Exception("No SMTP settings configured.");
                }

                // Configure SMTP client
                using var smtpClient = new SmtpClient(defaultSetting.SmtpServer, defaultSetting.Port)
                {
                    Credentials = new NetworkCredential(defaultSetting.Username, defaultSetting.Password),
                    EnableSsl = defaultSetting.EnableSsl
                };

                // Create the mail message
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(defaultSetting.Username), // Use Username as From address (adjust if needed)
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = isHtml
                };
                mailMessage.To.Add(toEmail);

                // Send the email
                await smtpClient.SendMailAsync(mailMessage);
                _logger.LogInformation("Email sent successfully to {ToEmail}", toEmail);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending email to {ToEmail}", toEmail);
                throw;
            }
        }
    }
}