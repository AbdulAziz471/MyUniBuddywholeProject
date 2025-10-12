using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Persistence.Interfaces;
using Persistence.Services;

namespace StudentDocumantRequestPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SmtpSettingController : ControllerBase
    {
        private readonly ISmtpSetting _smtpSetting;
       
        private readonly ILogger<SmtpSettingController> _logger;
        public SmtpSettingController(ISmtpSetting smtpSetting,  ILogger<SmtpSettingController> logger)
        {
            _smtpSetting = smtpSetting;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SmtpSetting>>> GetAll()
        {
            try
            {
                var settings = await _smtpSetting.GetAllAsync();
                return Ok(settings);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Internal server error while fetching SMTP settings");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SmtpSetting>> GetById(Guid id)
        {
            try
            {
                var setting = await _smtpSetting.GetByIdAsync(id);
                return Ok(setting);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "SMTP setting not found for ID: {Id}", id);
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<SmtpSetting>> Create(SmtpSetting smtpSetting)
        {
            try
            {
                var createdSetting = await _smtpSetting.CreateAsync(smtpSetting);
                return CreatedAtAction(nameof(GetById), new { id = createdSetting.Id }, createdSetting);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating SMTP setting");
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SmtpSetting>> Update(Guid id, SmtpSetting smtpSetting)
        {
            try
            {
                var updatedSetting = await _smtpSetting.UpdateAsync(id, smtpSetting);
                return Ok(updatedSetting);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating SMTP setting with ID: {Id}", id);
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var result = await _smtpSetting.DeleteAsync(id);
                if (!result)
                {
                    _logger.LogWarning("SMTP setting not found for deletion with ID: {Id}", id);
                    return NotFound("SMTP setting not found");
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Internal server error while deleting SMTP setting with ID: {Id}", id);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

       
    }
}