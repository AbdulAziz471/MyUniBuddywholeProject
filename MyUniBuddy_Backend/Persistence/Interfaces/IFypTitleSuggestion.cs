using Domain.Modals_DTO_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IFypTitleSuggestion
    {
        Task<IEnumerable<FypTitleSuggestionDto>> GetAllAsync(string? domain = null);
        Task<FypTitleSuggestionDto?> GetByIdAsync(Guid id);
        Task<Guid> CreateAsync(FypTitleSuggestionDto dto);
        Task<bool> UpdateAsync(Guid id, FypTitleSuggestionDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}
