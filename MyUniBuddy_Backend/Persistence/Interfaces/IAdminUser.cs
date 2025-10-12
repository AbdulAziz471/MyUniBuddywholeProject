using Domain.Modals_DTO_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IAdminUser
    {
        Task<Guid> CreateAdminUserAsync(UserCreateDto dto);
        Task<UserDto?> GetByIdAsync(Guid id);
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task UpdateAdminUserAsync(Guid id, UserUpdateDto dto);  // Method to update a user's information
        Task DeleteAdminUserAsync(Guid id);

    }
}
