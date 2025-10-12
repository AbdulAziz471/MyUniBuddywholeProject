using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Modals_DTO_
{
    // Domain/Modals_DTO_/PageDto.cs
    public class PageDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Key { get; set; } = null!;
        public Guid? ParentPageId { get; set; }
        public string? PageUrl { get; set; }
        public int PreferenceOrder { get; set; }
        public string Description { get; set; } = null!;
    }

    // Domain/Modals_DTO_/PageCreateUpdateDto.cs
    public class PageCreateUpdateDto
    {
        public string Title { get; set; } = null!;
        public string? Key { get; set; } = null!;
        public Guid? ParentPageId { get; set; }
        public string? PageUrl { get; set; }
        public int PreferenceOrder { get; set; }
        public string Description { get; set; } = null!;
        public string? CreatedBy { get; set; } = null!;
    }



    public class PermissionPageDto
    {
        public string PermissionType { get; set; } = string.Empty;
        public bool IsAllowed { get; set; }
    }

    public class DashboardPageDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Key { get; set; } = string.Empty;
        public Guid? ParentPageId { get; set; }
        public string? PageUrl { get; set; }
        public int PreferenceOrder { get; set; }
        public List<PermissionDto>? Permission { get; set; }
        public List<PageDto> SubPages { get; set; } = new();
    }
}
