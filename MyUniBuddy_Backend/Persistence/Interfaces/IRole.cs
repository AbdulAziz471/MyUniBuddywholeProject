using Domain.Modals_DTO_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IRole
    {
        Task<IEnumerable<RoleDto>> GetAllAsync();
        Task<RoleDto?> GetByIdAsync(Guid id);
        Task<Guid> CreateAsync(RoleCreateUpdateDto dto);
        Task<bool> UpdateAsync(Guid id, RoleCreateUpdateDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}
