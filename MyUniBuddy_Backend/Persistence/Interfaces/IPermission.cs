// Persistence/Interfaces/IPermissionService.cs
using Domain.Entities;
using Domain.Modals_DTO_;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IPermission
    {
        Task<IEnumerable<PermissionDto>> GetAllPermissionsAsync();
        Task<PermissionDto> GetPermissionByIdAsync(Guid id);
        Task<PermissionDto> CreatePermissionAsync(CreatePermissionDto permissionDto);
        Task<bool> UpdatePermissionAsync(Guid id, UpdatePermissionDto permissionDto);
        Task<bool> DeletePermissionAsync(Guid id);
    }
}
