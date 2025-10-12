using Domain.Modals_DTO_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IRolePage
    {
        Task<List<RolePageDetailDto>> GetRolePagePermissionsAsync(Guid roleId);
        Task UpdateRolePagePermissionsAsync(Guid roleId, List<RolePageDetailDto> pagePermissions);

    }
}
