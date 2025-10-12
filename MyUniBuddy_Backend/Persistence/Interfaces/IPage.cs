using Domain.Modals_DTO_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IPage
    {

        Task<IEnumerable<PageDto>> GetAllAsync();
        Task<PageDto?> GetByIdAsync(Guid id);
        Task<Guid> CreateAsync(PageCreateUpdateDto dto);
        Task<bool> UpdateAsync(Guid id, PageCreateUpdateDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}
