// Persistence/Services/QuestionService.cs
using Domain.Entities;
using Domain.Modals_DTO_;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly DbStudentRequestContext _context;

        public QuestionService(DbStudentRequestContext context)
        {
            _context = context;
        }

        public async Task<Guid> CreateQuestionAsync(QuestionCreateDto dto)
        {
            // Basic existence check (optional)
            var student = await _context.AspNetUsers.FindAsync(dto.StudentId)
                          ?? throw new Exception("Student not found");

            var q = new Question
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Body = dto.Body,
                Category = dto.Category,
                StudentId = dto.StudentId,
                Status = QuestionStatus.Open
            };

            _context.Questions.Add(q);
            await _context.SaveChangesAsync();
            return q.Id;
        }

        public async Task<IEnumerable<QuestionDto>> GetAllAsync(string? category = null, int? status = null, Guid? studentId = null)
        {
            var query = _context.Questions
                .Include(q => q.Student)
                .Include(q => q.Answers).ThenInclude(a => a.Admin)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(category))
                query = query.Where(q => q.Category == category);

            if (status.HasValue)
                query = query.Where(q => (int)q.Status == status.Value);

            if (studentId.HasValue)
                query = query.Where(q => q.StudentId == studentId.Value);

            return await query
                .OrderByDescending(q => q.CreatedAt)
                .Select(q => new QuestionDto
                {
                    Id = q.Id,
                    Title = q.Title,
                    Body = q.Body,
                    Category = q.Category,
                    Status = (int)q.Status,
                    CreatedAt = q.CreatedAt,
                    UpdatedAt = q.UpdatedAt,
                    StudentId = q.StudentId,
                    StudentName = q.Student.UserName,
                    Answers = q.Answers
                        .OrderBy(a => a.CreatedAt)
                        .Select(a => new AnswerDto
                        {
                            Id = a.Id,
                            Body = a.Body,
                            AdminId = a.AdminId,
                            AdminName = a.Admin.UserName,
                            IsOfficial = a.IsOfficial,
                            CreatedAt = a.CreatedAt
                        }).ToList()
                })
                .ToListAsync();
        }

        public async Task<QuestionDto?> GetByIdAsync(Guid id)
        {
            return await _context.Questions
                .Include(q => q.Student)
                .Include(q => q.Answers).ThenInclude(a => a.Admin)
                .Where(q => q.Id == id)
                .Select(q => new QuestionDto
                {
                    Id = q.Id,
                    Title = q.Title,
                    Body = q.Body,
                    Category = q.Category,
                    Status = (int)q.Status,
                    CreatedAt = q.CreatedAt,
                    UpdatedAt = q.UpdatedAt,
                    StudentId = q.StudentId,
                    StudentName = q.Student.UserName,
                    Answers = q.Answers
                        .OrderBy(a => a.CreatedAt)
                        .Select(a => new AnswerDto
                        {
                            Id = a.Id,
                            Body = a.Body,
                            AdminId = a.AdminId,
                            AdminName = a.Admin.UserName,
                            IsOfficial = a.IsOfficial,
                            CreatedAt = a.CreatedAt
                        }).ToList()
                })
                .FirstOrDefaultAsync();
        }

        public async Task UpdateQuestionAsync(Guid id, QuestionUpdateDto dto)
        {
            var q = await _context.Questions.FindAsync(id) ?? throw new Exception("Question not found");

            if (!string.IsNullOrWhiteSpace(dto.Title)) q.Title = dto.Title!;
            if (!string.IsNullOrWhiteSpace(dto.Body)) q.Body = dto.Body!;
            if (dto.Category != null) q.Category = dto.Category;
            if (dto.Status.HasValue) q.Status = (QuestionStatus)dto.Status.Value;

            q.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteQuestionAsync(Guid id)
        {
            var q = await _context.Questions.FindAsync(id) ?? throw new Exception("Question not found");
            _context.Questions.Remove(q);
            await _context.SaveChangesAsync();
        }

        public async Task<Guid> AddAnswerAsync(Guid questionId, AnswerCreateDto dto)
        {
            var q = await _context.Questions.FindAsync(questionId) ?? throw new Exception("Question not found");
            var admin = await _context.AspNetUsers.FindAsync(dto.AdminId) ?? throw new Exception("Admin not found");

            var a = new Answer
            {
                Id = Guid.NewGuid(),
                QuestionId = questionId,
                Body = dto.Body,
                AdminId = dto.AdminId,
                IsOfficial = dto.IsOfficial
            };

            _context.Answers.Add(a);

            // If the question was open, mark as answered
            if (q.Status == QuestionStatus.Open)
                q.Status = QuestionStatus.Answered;

            q.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return a.Id;
        }

        public async Task<IEnumerable<AnswerDto>> GetAnswersAsync(Guid questionId)
        {
            var exists = await _context.Questions.AnyAsync(q => q.Id == questionId);
            if (!exists) throw new Exception("Question not found");

            return await _context.Answers
                .Include(a => a.Admin)
                .Where(a => a.QuestionId == questionId)
                .OrderBy(a => a.CreatedAt)
                .Select(a => new AnswerDto
                {
                    Id = a.Id,
                    Body = a.Body,
                    AdminId = a.AdminId,
                    AdminName = a.Admin.UserName,
                    IsOfficial = a.IsOfficial,
                    CreatedAt = a.CreatedAt
                })
                .ToListAsync();
        }

        public async Task DeleteAnswerAsync(Guid answerId)
        {
            var a = await _context.Answers.FindAsync(answerId) ?? throw new Exception("Answer not found");
            _context.Answers.Remove(a);
            await _context.SaveChangesAsync();
        }
    }
}
