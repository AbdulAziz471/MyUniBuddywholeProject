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
    public class MeetingRequestService : IMeetingRequestService
    {
        private readonly DbStudentRequestContext _context;

        public MeetingRequestService(DbStudentRequestContext context)
        {
            _context = context;
        }

        public async Task<Guid> CreateAsync(MeetingRequestDto dto)
        {
            var entity = new MeetingRequest
            {
                Id = Guid.NewGuid(),
                StudentId = dto.StudentId,
                RequestedDate = dto.RequestedDate,
                RequestedTime = dto.RequestedTime,
                Topic = dto.Topic,
                Description = dto.Description,
                // Status defaults to Pending
                CreatedAt = DateTime.UtcNow
            };
            _context.MeetingRequests.Add(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<IEnumerable<MeetingRequestDto>> GetByStudentAsync(Guid studentId)
        {
            return await _context.MeetingRequests
                .Where(m => m.StudentId == studentId)
                .OrderByDescending(m => m.CreatedAt)
                .Select(m => new MeetingRequestDto
                {
                    Id = m.Id,
                    StudentId = m.StudentId,
                    RequestedDate = m.RequestedDate,
                    RequestedTime = m.RequestedTime,
                    Topic = m.Topic,
                    Description = m.Description,
                    Status = m.Status,
                    AdminNote = m.AdminNote,
                    MeetLink = m.MeetLink
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<MeetingRequestDto>> GetAllAsync()
        {
            return await _context.MeetingRequests
                .OrderByDescending(m => m.CreatedAt)
                .Select(m => new MeetingRequestDto
                {
                    Id = m.Id,
                    StudentId = m.StudentId,
                    RequestedDate = m.RequestedDate,
                    RequestedTime = m.RequestedTime,
                    Topic = m.Topic,
                    Description = m.Description,
                    Status = m.Status,
                    AdminNote = m.AdminNote,
                    MeetLink = m.MeetLink
                })
                .ToListAsync();
        }

        public async Task<bool> ApproveAsync(Guid id, string meetLink)
        {
            var entity = await _context.MeetingRequests.FindAsync(id);
            if (entity == null) return false;

            entity.Status = MeetingRequestStatus.Approved;
            entity.MeetLink = meetLink;
            entity.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RejectAsync(Guid id, string adminNote)
        {
            var entity = await _context.MeetingRequests.FindAsync(id);
            if (entity == null) return false;

            entity.Status = MeetingRequestStatus.Rejected;
            entity.AdminNote = adminNote;
            entity.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
