using Domain.Modals_DTO_;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;

namespace StudentDocumantRequestPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolePagesController : ControllerBase
    {
        private readonly IRolePage _rolePageService;

        public RolePagesController(IRolePage rolePageService)
        {
            _rolePageService = rolePageService;
        }

        /// <summary>
        /// Retrieves a list of pages and their associated permissions for a given role.
        /// Example: GET /api/RolePages/GetByRoleId?Id=f5a4d5c9-27a9-4f0d-8827-68ebf6688601
        /// </summary>
        /// <param name="id">The GUID of the role.</param>
        /// <returns>A list of RolePageDetailDto.</returns>
        [HttpGet("GetByRoleId")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<RolePageDetailDto>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<RolePageDetailDto>>> GetByRoleId([FromQuery] Guid id)
        {
            try
            {
                var rolePagePermissions = await _rolePageService.GetRolePagePermissionsAsync(id);

                if (rolePagePermissions == null || !rolePagePermissions.Any())
                {
                    return NotFound($"No page permissions found for RoleId: {id}");
                }

                return Ok(rolePagePermissions);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                Console.Error.WriteLine($"Error fetching role page permissions: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates the permissions for a specific role across multiple pages.
        /// This endpoint expects the full desired state of page-permissions for the role.
        /// Example: POST /api/RolePages/Update
        /// Payload:
        /// {
        ///     "roleId": "f5a4d5c9-27a9-4f0d-8827-68ebf6688601",
        ///     "pagePermissions": [
        ///         {
        ///             "pageId": "f3932fee-7737-4dd7-a8de-007d59b097e9",
        ///             "permissions": [
        ///                 "5353104e-8b39-464f-9356-1ee52c6a8b40",
        ///                 "7182ee6d-69e2-4dcf-8947-448ef3ed927e"
        ///             ]
        ///         },
        ///         {
        ///             "pageId": "another-page-guid",
        ///             "permissions": [
        ///                 "another-permission-guid"
        ///             ]
        ///         }
        ///     ]
        /// }
        /// </summary>
        /// <param name="request">The request DTO containing the RoleId and the desired page permissions.</param>
        /// <returns>An IActionResult indicating success or failure.</returns>
        [HttpPost("Update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateRolePagePermissions([FromBody] UpdateRolePermissionsRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _rolePageService.UpdateRolePagePermissionsAsync(request.RoleId, request.PagePermissions);
                return Ok("Role page permissions updated successfully.");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.Error.WriteLine($"Error updating role page permissions: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
    }
}
