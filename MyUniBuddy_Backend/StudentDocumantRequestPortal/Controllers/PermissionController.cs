using Domain.Modals_DTO_;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;
using StudentDocumantRequestPortal.Filters;

namespace StudentDocumantRequestPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class PermissionController : ControllerBase
    {
        private readonly IPermission _permissionService;

        public PermissionController(IPermission permissionService)
        {
            _permissionService = permissionService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<PermissionDto>))]
        //[Permission("account_management", "permission", "List")]
        public async Task<IActionResult> GetAllPermissions()
        {
            var permissions = await _permissionService.GetAllPermissionsAsync();
            return Ok(permissions);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PermissionDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPermissionById(Guid id)
        {
            var permission = await _permissionService.GetPermissionByIdAsync(id);
            if (permission == null)
            {
                return NotFound($"Permission with ID {id} not found.");
            }
            return Ok(permission);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(PermissionDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Permission("account_management", "permission", "Add")]
        public async Task<IActionResult> CreatePermission([FromBody] CreatePermissionDto permissionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdPermission = await _permissionService.CreatePermissionAsync(permissionDto);
            // Return 201 Created status with the location of the new resource
            return CreatedAtAction(nameof(GetPermissionById), new { id = createdPermission.Id }, createdPermission);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        //[Permission("account_management", "permission", "Update")]
        public async Task<IActionResult> UpdatePermission(Guid id, [FromBody] UpdatePermissionDto permissionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _permissionService.UpdatePermissionAsync(id, permissionDto);
            if (!result)
            {
                return NotFound($"Permission with ID {id} not found.");
            }
            return NoContent(); // 204 No Content for successful update
        }

       
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        //[Permission("account_management", "permission", "delete")]
        public async Task<IActionResult> DeletePermission(Guid id)
        {
            var result = await _permissionService.DeletePermissionAsync(id);
            if (!result)
            {
                return NotFound($"Permission with ID {id} not found.");
            }
            return NoContent(); // 204 No Content for successful deletion
        }
    }
}
