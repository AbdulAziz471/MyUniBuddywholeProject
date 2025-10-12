using Domain.Modals_DTO_;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;
using System;
using System.Threading.Tasks;

namespace StudentDocumantRequestPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChangePasswordController : ControllerBase
    {
        private readonly IChangePassword _changePasswordService;

        public ChangePasswordController(IChangePassword changePasswordService)
        {
            _changePasswordService = changePasswordService;
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword([FromBody] UserChangePasswordDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (dto == null || dto.UserId == Guid.Empty)
                {
                    return BadRequest(new { Message = "Invalid user ID or request data." });
                }

                await _changePasswordService.ChangePassword(dto.UserId, dto);

                return Ok(new { Message = "Password changed successfully." });
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while changing the password.", Details = ex.Message });
            }
        }
    }
}