using Domain.Modals_DTO_;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;
using Persistence.Services;

namespace StudentDocumantRequestPortal.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class PagePermissionController : ControllerBase
    {
        private readonly IPagePermission _pagePermissionService;

        public PagePermissionController(IPagePermission pagePermissionService)
        {
            _pagePermissionService = pagePermissionService;
        }

        [HttpPost("Update")]
        public async Task<IActionResult> UpdatePagePermissions([FromBody] UpdatePagePermissionsRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _pagePermissionService.UpdatePagePermissionsAsync(request.PageId, request.PermissionIds);
                return Ok("Page permissions updated successfully.");
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework like Serilog or NLog)
                Console.Error.WriteLine($"Error updating page permissions: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

      
        [HttpGet("GetByPageId")]
        public async Task<ActionResult<List<PagePermissionDto>>> GetPagePermissionsByPageId([FromQuery] Guid id)
        {
            try
            {
                var permissions = await _pagePermissionService.GetPagePermissionsByPageIdAsync(id);

                if (permissions == null || !permissions.Any())
                {
                    return NotFound($"No permissions found for PageId: {id}");
                }

                return Ok(permissions);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.Error.WriteLine($"Error fetching page permissions: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetPagesWithallPermissions")]
        public async Task<IActionResult> GetAll()
        {
            var pageswithPermissions = await _pagePermissionService.GetPagesWithAllPermissionsAsync();
            return Ok(pageswithPermissions);
        }
    }
}