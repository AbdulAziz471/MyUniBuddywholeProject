using Domain.Modals_DTO_;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;
using System;
using System.Threading.Tasks;

namespace StudentDocumantRequestPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FypTitleSuggestionController : ControllerBase
    {
        private readonly IFypTitleSuggestion _service;

        public FypTitleSuggestionController(IFypTitleSuggestion service)
        {
            _service = service;
        }

        // GET /api/FypTitleSuggestion?domain=Waste-to-Energy
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? domain)
        {
            var items = await _service.GetAllAsync(domain);
            return Ok(items);
        }

        // GET /api/FypTitleSuggestion/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var item = await _service.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        // POST /api/FypTitleSuggestion
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] FypTitleSuggestionDto dto)
        {
            var id = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        // PUT /api/FypTitleSuggestion/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] FypTitleSuggestionDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        // DELETE /api/FypTitleSuggestion/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
