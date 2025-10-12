using Domain.Modals_DTO_;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;
using System;
using System.Threading.Tasks;

namespace StudentDocumantRequestPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeetingRequestController : ControllerBase
    {
        private readonly IMeetingRequestService _service;

        public MeetingRequestController(IMeetingRequestService service)
        {
            _service = service;
        }

        // GET api/MeetingRequest/student/{studentId}
        [HttpGet("student/{studentId}")]
        public async Task<IActionResult> GetByStudent(Guid studentId)
        {
            var list = await _service.GetByStudentAsync(studentId);
            return Ok(list);
        }

        // GET api/MeetingRequest/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var list = await _service.GetAllAsync();
            return Ok(list);
        }

        // POST api/MeetingRequest
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MeetingRequestDto dto)
        {
            var id = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetByStudent), new { studentId = dto.StudentId }, id);
        }

        // POST api/MeetingRequest/{id}/approve
        [HttpPost("{id}/approve")]
        public async Task<IActionResult> Approve(Guid id, [FromBody] string meetLink)
        {
            var success = await _service.ApproveAsync(id, meetLink);
            if (!success) return NotFound();
            return NoContent();
        }

        // POST api/MeetingRequest/{id}/reject
        [HttpPost("{id}/reject")]
        public async Task<IActionResult> Reject(Guid id, [FromBody] string adminNote)
        {
            var success = await _service.RejectAsync(id, adminNote);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
