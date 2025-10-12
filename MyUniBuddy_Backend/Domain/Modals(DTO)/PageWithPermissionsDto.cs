using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Modals_DTO_
{
    public class PageWithPermissionsDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Key { get; set; } = null!;
        public Guid? ParentPageId { get; set; }
        public string? PageUrl { get; set; }
        public int PreferenceOrder { get; set; }
        public string Description { get; set; } = null!;
        public DateOnly CreatedOn { get; set; }
        public string? CreatedBy { get; set; }

        // This is the collection of Permissions associated with this Page
        public List<PermissionDto> Permissions { get; set; } = new List<PermissionDto>();
    }
}
