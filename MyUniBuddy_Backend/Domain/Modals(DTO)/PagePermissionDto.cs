using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Modals_DTO_
{
    public class PagePermissionDto
    {
        public Guid PageId { get; set; }
        public Guid PermissionId { get; set; }
    }

    // This DTO will be used for the POST /api/PagePermission/Update endpoint
    public class UpdatePagePermissionsRequestDto
    {
        public Guid PageId { get; set; }
        public List<Guid> PermissionIds { get; set; } = new List<Guid>();
    }
}
