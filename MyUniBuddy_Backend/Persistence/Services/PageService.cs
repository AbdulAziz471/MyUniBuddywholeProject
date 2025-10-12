using Domain.Entities;
using Domain.Modals_DTO_;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Persistence.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Services
{
    public class PageService : IPage
    {
        private readonly DbStudentRequestContext _context;

        public PageService(DbStudentRequestContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PageDto>> GetAllAsync()
        {
            return await _context.Pages
                .Select(p => new PageDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Key = p.Key,
                    ParentPageId = p.ParentPageId,
                    PageUrl = p.PageUrl,
                    PreferenceOrder = p.PreferenceOrder,
                    Description = p.Description
                }).ToListAsync();
        }

        public async Task<PageDto?> GetByIdAsync(Guid id)
        {
            return await _context.Pages
                .Where(p => p.Id == id)
                .Select(p => new PageDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Key = p.Key,
                    ParentPageId = p.ParentPageId,
                    PageUrl = p.PageUrl,
                    PreferenceOrder = p.PreferenceOrder,
                    Description = p.Description
                }).FirstOrDefaultAsync();
        }

        public async Task<Guid> CreateAsync(PageCreateUpdateDto dto)
        {
            var page = new Page
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Key = dto.Key,
                ParentPageId = dto.ParentPageId,
                PageUrl = dto.PageUrl,
                PreferenceOrder = dto.PreferenceOrder,
                Description = dto.Description,
                CreatedOn = DateOnly.FromDateTime(DateTime.Now),
                CreatedBy = dto.CreatedBy
            };

            _context.Pages.Add(page);
            await _context.SaveChangesAsync();
            return page.Id;
        }

        public async Task<bool> UpdateAsync(Guid id, PageCreateUpdateDto dto)
        {
            var page = await _context.Pages.FindAsync(id);
            if (page == null) return false;

            page.Title = dto.Title;
            page.Key = dto.Key;
            page.ParentPageId = dto.ParentPageId;
            page.PageUrl = dto.PageUrl;
            page.PreferenceOrder = dto.PreferenceOrder;
            page.Description = dto.Description;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var page = await _context.Pages.FindAsync(id);
            if (page == null) return false;

            _context.Pages.Remove(page);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}