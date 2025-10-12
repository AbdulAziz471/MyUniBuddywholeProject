using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;
using Persistence.Services;

namespace StudentDocumantRequestPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmailController : ControllerBase
    {
       
        private readonly IEmail _emailService;
        private readonly ILogger<EmailController> _logger;

        public EmailController(IEmail emailService, ILogger<EmailController> logger)
        {
            _emailService = emailService;
            _logger = logger;
        }
        [HttpPost("send")]
        public async Task<ActionResult> SendTestEmail([FromBody] EmailRequest request)
        {
            try
            {
                await _emailService.SendEmailAsync(request.ToEmail, request.Subject, request.Body, request.IsHtml);
                return Ok("Email sent successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending test email");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        public class EmailRequest
        {
            public string ToEmail { get; set; }
            public string Subject { get; set; }
            public string Body { get; set; }
            public bool IsHtml { get; set; } = false;
        }
    }
}
