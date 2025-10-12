using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Modals_DTO_
{
    public class RolePageDetailDto
    {
        public Guid PageId { get; set; }
        public List<Guid> Permissions { get; set; } = new List<Guid>();
    }

    // DTO for the POST request: Represents the entire set of page-permissions for a role to be updated
    public class UpdateRolePermissionsRequestDto
    {
        public Guid RoleId { get; set; }
        // This list will contain the desired state of page-permissions for the given role.
        // Each entry specifies a PageId and the list of PermissionIds associated with it for this role.
        public List<RolePageDetailDto> PagePermissions { get; set; } = new List<RolePageDetailDto>();
    }
}
