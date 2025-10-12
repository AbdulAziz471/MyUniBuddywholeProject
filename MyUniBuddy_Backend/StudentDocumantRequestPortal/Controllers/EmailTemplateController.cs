using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Persistence.Interfaces;

namespace StudentDocumantRequestPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Assuming authorization is required, adjust permissions as needed
    public class EmailTemplateController : ControllerBase
    {
        private readonly IEmailTemplate _emailTemplateService;
        private readonly ILogger<EmailTemplateController> _logger;

        public EmailTemplateController(IEmailTemplate emailTemplateService, ILogger<EmailTemplateController> logger)
        {
            _emailTemplateService = emailTemplateService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmailTemplate>>> GetAll()
        {
            try
            {
                var templates = await _emailTemplateService.GetAllAsync();
                return Ok(templates);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Internal server error while fetching email templates");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmailTemplate>> GetById(Guid id)
        {
            try
            {
                var template = await _emailTemplateService.GetByIdAsync(id);
                return Ok(template);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Email template not found for ID: {Id}", id);
                return NotFound(ex.Message);
            }
        }

        [HttpGet("by-name/{name}")]
        public async Task<ActionResult<EmailTemplate>> GetByName(string name)
        {
            try
            {
                var template = await _emailTemplateService.GetByNameAsync(name);
                return Ok(template);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Email template not found for Name: {Name}", name);
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<EmailTemplate>> Create(EmailTemplate emailTemplate)
        {
            try
            {
                var createdTemplate = await _emailTemplateService.CreateAsync(emailTemplate);
                return CreatedAtAction(nameof(GetById), new { id = createdTemplate.Id }, createdTemplate);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating email template");
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EmailTemplate>> Update(Guid id, EmailTemplate emailTemplate)
        {
            try
            {
                var updatedTemplate = await _emailTemplateService.UpdateAsync(id, emailTemplate);
                return Ok(updatedTemplate);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating email template with ID: {Id}", id);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var result = await _emailTemplateService.DeleteAsync(id);
                if (!result)
                {
                    _logger.LogWarning("Email template not found for deletion with ID: {Id}", id);
                    return NotFound("Email template not found");
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Internal server error while deleting email template with ID: {Id}", id);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}