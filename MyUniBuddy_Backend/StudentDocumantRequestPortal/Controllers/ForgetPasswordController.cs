// StudentDocumantRequestPortal.Controllers/ForgotPasswordController.cs
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;
using Domain.Modals_DTO_; // Assuming you create DTOs for these requests
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ForgotPasswordController : ControllerBase
{
    private readonly IForgotPasswordService _forgotPasswordService;

    public ForgotPasswordController(IForgotPasswordService forgotPasswordService)
    {
        _forgotPasswordService = forgotPasswordService;
    }

    [HttpPost("send-link")]
    public async Task<IActionResult> SendResetLink([FromBody] ForgotPasswordDto dto)
    {
        try
        {
            await _forgotPasswordService.SendPasswordResetLinkAsync(dto.Email);
            return Ok(new { Message = "If an account with that email exists, a password reset link has been sent." });
        }
        catch (Exception ex)
        {
            // Do not reveal if the email exists for security reasons
            return Ok(new { Message = "If an account with that email exists, a password reset link has been sent." });
        }
    }

    [HttpPost("reset")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
    {
        try
        {
            await _forgotPasswordService.ResetPasswordAsync(dto.Email, dto.Token, dto.NewPassword);
            return Ok(new { Message = "Password has been successfully reset." });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "An error occurred while resetting the password.", Details = ex.Message });
        }
    }
}

// Example DTOs
public class ForgotPasswordDto
{
    public string Email { get; set; }
}

public class ResetPasswordDto
{
    public string Email { get; set; }
    public string Token { get; set; }
    public string NewPassword { get; set; }
}