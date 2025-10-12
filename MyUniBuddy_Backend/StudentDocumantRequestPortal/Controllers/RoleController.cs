using Domain.Modals_DTO_;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;
using Persistence.Services;
using StudentDocumantRequestPortal.Filters;

namespace StudentDocumantRequestPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    //[Authorize]
    public class RoleController : ControllerBase
    {
        private readonly IRole _roleService;

        public RoleController(IRole roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]

        //[Permission("account_management", "role", "List")]
        public async Task<IActionResult> GetAll()
        {
            var roles = await _roleService.GetAllAsync();
            return Ok(roles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role == null) return NotFound();
            return Ok(role);
        }

        [HttpPost]
        //[Permission("account_management", "role", "Add")]
        public async Task<IActionResult> Create([FromBody] RoleCreateUpdateDto dto)
        {
            var id = await _roleService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpPut("{id}")]
        //[Permission("account_management", "role", "update")]
        public async Task<IActionResult> Update(Guid id, [FromBody] RoleCreateUpdateDto dto)
        {
            var updated = await _roleService.UpdateAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]

        //[Permission("account_management", "role", "Delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _roleService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}