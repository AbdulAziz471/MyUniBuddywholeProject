using Domain.Entities;
using Domain.Modals_DTO_;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Persistence.Interfaces;
using Persistence.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuth _authService;

    public AuthController(IAuth authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Authenticate user and generate JWT token.
    /// </summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid request");
        try
        {
            var loginResponse = await _authService.LoginAsync(model);
            return Ok(loginResponse);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
        }
    }




    [HttpPost("Registor")]

    public async Task<IActionResult> CreateAdminUser([FromBody] RegistorDto dto)
    {
        var id = await _authService.RegistorAsync(dto);
        return Ok(id);
    }


}