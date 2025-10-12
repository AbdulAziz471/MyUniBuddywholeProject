// Persistence/Interfaces/IQuestionService.cs
using Domain.Modals_DTO_;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IQuestionService
    {
        Task<Guid> CreateQuestionAsync(QuestionCreateDto dto);
        Task<IEnumerable<QuestionDto>> GetAllAsync(string? category = null, int? status = null, Guid? studentId = null);
        Task<QuestionDto?> GetByIdAsync(Guid id);
        Task UpdateQuestionAsync(Guid id, QuestionUpdateDto dto);
        Task DeleteQuestionAsync(Guid id);

        Task<Guid> AddAnswerAsync(Guid questionId, AnswerCreateDto dto);
        Task<IEnumerable<AnswerDto>> GetAnswersAsync(Guid questionId);
        Task DeleteAnswerAsync(Guid answerId);
    }
}
