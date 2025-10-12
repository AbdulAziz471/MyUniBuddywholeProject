// StudentDocumantRequestPortal/Controllers/QuestionController.cs
using Domain.Modals_DTO_;
using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;

namespace StudentDocumantRequestPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionService _svc;

        public QuestionController(IQuestionService svc)
        {
            _svc = svc;
        }

        // STUDENT: create a question
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] QuestionCreateDto dto)
        {
            var id = await _svc.CreateQuestionAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        // BOTH: list questions (admin may filter by status/category; student by own id)
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? category, [FromQuery] int? status, [FromQuery] Guid? studentId)
        {
            var items = await _svc.GetAllAsync(category, status, studentId);
            return Ok(items);
        }

        // BOTH: get one
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var q = await _svc.GetByIdAsync(id);
            if (q == null) return NotFound();
            return Ok(q);
        }

        // STUDENT (or Admin): update a question (title/body/category/status)
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] QuestionUpdateDto dto)
        {
            await _svc.UpdateQuestionAsync(id, dto);
            return NoContent();
        }

        // ADMIN: add an answer to a question
        [HttpPost("{id:guid}/answers")]
        public async Task<IActionResult> AddAnswer(Guid id, [FromBody] AnswerCreateDto dto)
        {
            var answerId = await _svc.AddAnswerAsync(id, dto);
            return CreatedAtAction(nameof(GetAnswers), new { id }, new { answerId });
        }

        // BOTH: list answers of a question
        [HttpGet("{id:guid}/answers")]
        public async Task<IActionResult> GetAnswers(Guid id)
        {
            var answers = await _svc.GetAnswersAsync(id);
            return Ok(answers);
        }

        // ADMIN: delete an answer
        [HttpDelete("answers/{answerId:guid}")]
        public async Task<IActionResult> DeleteAnswer(Guid answerId)
        {
            await _svc.DeleteAnswerAsync(answerId);
            return NoContent();
        }

        // ADMIN or OWNER: delete question
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _svc.DeleteQuestionAsync(id);
            return NoContent();
        }
    }
}
