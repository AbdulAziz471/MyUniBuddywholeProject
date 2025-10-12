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
    public class FypTitleSuggestionService : IFypTitleSuggestion
    {
        private readonly DbStudentRequestContext _context;

        public FypTitleSuggestionService(DbStudentRequestContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FypTitleSuggestionDto>> GetAllAsync(string? domain = null)
        {
            var query = _context.FypTitleSuggestions.AsQueryable();
            if (!string.IsNullOrWhiteSpace(domain))
                query = query.Where(x => x.Domain != null && x.Domain == domain);

            return await query
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new FypTitleSuggestionDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Domain = x.Domain,
                    SubDomain = x.SubDomain,
                    ProblemStatement = x.ProblemStatement,
                    Description = x.Description,
                    KeywordsCsv = x.KeywordsCsv,
                    ToolsAndTech = x.ToolsAndTech,
                    Difficulty = x.Difficulty,
                    ProposedBy = x.ProposedBy
                }).ToListAsync();
        }

        public async Task<FypTitleSuggestionDto?> GetByIdAsync(Guid id)
        {
            return await _context.FypTitleSuggestions
                .Where(x => x.Id == id)
                .Select(x => new FypTitleSuggestionDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Domain = x.Domain,
                    SubDomain = x.SubDomain,
                    ProblemStatement = x.ProblemStatement,
                    Description = x.Description,
                    KeywordsCsv = x.KeywordsCsv,
                    ToolsAndTech = x.ToolsAndTech,
                    Difficulty = x.Difficulty,
                    ProposedBy = x.ProposedBy
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Guid> CreateAsync(FypTitleSuggestionDto dto)
        {
            var entity = new FypTitleSuggestion
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Domain = dto.Domain,
                SubDomain = dto.SubDomain,
                ProblemStatement = dto.ProblemStatement,
                Description = dto.Description,
                KeywordsCsv = dto.KeywordsCsv,
                ToolsAndTech = dto.ToolsAndTech,
                Difficulty = dto.Difficulty,
                ProposedBy = dto.ProposedBy
            };

            _context.FypTitleSuggestions.Add(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<bool> UpdateAsync(Guid id, FypTitleSuggestionDto dto)
        {
            var entity = await _context.FypTitleSuggestions.FindAsync(id);
            if (entity == null) return false;

            entity.Title = dto.Title;
            entity.Domain = dto.Domain;
            entity.SubDomain = dto.SubDomain;
            entity.ProblemStatement = dto.ProblemStatement;
            entity.Description = dto.Description;
            entity.KeywordsCsv = dto.KeywordsCsv;
            entity.ToolsAndTech = dto.ToolsAndTech;
            entity.Difficulty = dto.Difficulty;
            entity.ProposedBy = dto.ProposedBy;
            entity.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _context.FypTitleSuggestions.FindAsync(id);
            if (entity == null) return false;

            _context.FypTitleSuggestions.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
