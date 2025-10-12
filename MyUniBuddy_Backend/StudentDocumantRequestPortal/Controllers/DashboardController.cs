using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;
using Persistence.Services;
using StudentDocumantRequestPortal.Filters;

namespace StudentDocumantRequestPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboard _dashboardService;

        public DashboardController(IDashboard dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("layout/{userId}")]
       
        public async Task<IActionResult> GetUserLayout(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return BadRequest("Invalid user ID.");
            }

            var layout = await _dashboardService.GetUserPagesAndPermissionsAsync(userId);

            if (layout == null || !layout.Any())
            {
                return NotFound("No pages or permissions found for this user.");
            }

            return Ok(layout);
        }
 }
}