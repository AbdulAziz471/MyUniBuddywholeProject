using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Modals_DTO_
{
    public class PermissionLayoutDto
    {
        public string PermissionType { get; set; } = string.Empty;
        public bool IsAllowed { get; set; }
    }

    public class PagesLayoutDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Key { get; set; }
        public Guid? ParentPageId { get; set; }
        public string? PageUrl { get; set; }
        public int PreferenceOrder { get; set; }
        public List<PermissionLayoutDto>? Permission { get; set; }
        public List<PagesLayoutDto>? SubPages { get; set; }
    }

}
