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
    public class PageController : ControllerBase
    {
        private readonly IPage _pageService;

        public PageController(IPage pageService)
        {
            _pageService = pageService;
        }

        [HttpGet]
        //[Permission("account_management", "page", "List")]
        public async Task<IActionResult> GetAll()
        {
            var pages = await _pageService.GetAllAsync();
            return Ok(pages);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var page = await _pageService.GetByIdAsync(id);
            if (page == null) return NotFound();
            return Ok(page);
        }

        [HttpPost]
        //[Permission("account_management", "page", "Add")]
        public async Task<IActionResult> Create([FromBody] PageCreateUpdateDto dto)
        {
            var id = await _pageService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpPut("{id}")]
        //[Permission("account_management", "page", "edit")]
        public async Task<IActionResult> Update(Guid id, [FromBody] PageCreateUpdateDto dto)
        {
            var updated = await _pageService.UpdateAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        //[Permission("account_management", "page", "Delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _pageService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
