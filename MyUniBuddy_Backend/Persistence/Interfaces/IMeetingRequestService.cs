using Domain.Modals_DTO_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IMeetingRequestService
    {
        Task<IEnumerable<MeetingRequestDto>> GetByStudentAsync(Guid studentId);
        Task<IEnumerable<MeetingRequestDto>> GetAllAsync();
        Task<Guid> CreateAsync(MeetingRequestDto dto);
        Task<bool> ApproveAsync(Guid id, string meetLink);
        Task<bool> RejectAsync(Guid id, string adminNote);
    }
}
