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
    public class RoleService : IRole
    {
        private readonly DbStudentRequestContext _context;

        public RoleService(DbStudentRequestContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoleDto>> GetAllAsync()
        {
            return await _context.AspNetRoles
                .Select(r => new RoleDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    NormalizedName = r.NormalizedName
                }).ToListAsync();
        }

        public async Task<RoleDto?> GetByIdAsync(Guid id)
        {
            return await _context.AspNetRoles
                .Where(r => r.Id == id)
                .Select(r => new RoleDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    NormalizedName = r.NormalizedName
                }).FirstOrDefaultAsync();
        }

        public async Task<Guid> CreateAsync(RoleCreateUpdateDto dto)
        {
            var role = new AspNetRole
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                NormalizedName = dto.Name?.ToUpperInvariant(),
                ConcurrencyStamp = Guid.NewGuid().ToString()
            };

            _context.AspNetRoles.Add(role);
            await _context.SaveChangesAsync();
            return role.Id;
        }

        public async Task<bool> UpdateAsync(Guid id, RoleCreateUpdateDto dto)
        {
            var role = await _context.AspNetRoles.FindAsync(id);
            if (role == null) return false;

            role.Name = dto.Name;
            role.NormalizedName = dto.Name?.ToUpperInvariant();
            role.ConcurrencyStamp = Guid.NewGuid().ToString(); // simulate concurrency tracking

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var role = await _context.AspNetRoles.FindAsync(id);
            if (role == null) return false;

            _context.AspNetRoles.Remove(role);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
