using Domain.Modals_DTO_;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;
using StudentDocumantRequestPortal.Filters;

namespace StudentDocumantRequestPortal.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {
        private readonly IAdminUser _adminuserService;

        public UserController(IAdminUser userService)
        {
            _adminuserService = userService;
        }

        [HttpPost("CreateAdmin")]

 
        public async Task<IActionResult> CreateAdminUser([FromBody] UserCreateDto dto)
        {
            var id = await _adminuserService.CreateAdminUserAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpGet("{id}")]

        
        public async Task<IActionResult> GetById(Guid id)
        {
            var user = await _adminuserService.GetByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet]


        public async Task<IActionResult> GetAll()
        {
            var users = await _adminuserService.GetAllAsync();
            return Ok(users);
        }


        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateAdminUser(Guid id, [FromBody] UserUpdateDto dto)
        {
            try
            {
                await _adminuserService.UpdateAdminUserAsync(id, dto);
                return Ok(new { message = "User updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        //[Permission("account_management", "User", "Delete")]
        public async Task<IActionResult> DeleteAdminUser(Guid id)
        {
            try
            {
                await _adminuserService.DeleteAdminUserAsync(id);
                return Ok(new { message = "User deleted successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
