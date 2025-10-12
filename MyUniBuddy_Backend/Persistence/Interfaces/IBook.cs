using Domain.Modals_DTO_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IBook
    {

        Task<IEnumerable<BookDto>> GetAllAsync();
        Task<BookDto?> GetByIdAsync(Guid id);
        Task<Guid> CreateAsync(BookDto dto);
        Task<bool> UpdateAsync(Guid id, BookDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}
