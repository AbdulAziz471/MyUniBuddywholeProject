using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class Page
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


    public bool IsOnlyForSuperAdmin { get; set; }

    // CORRECTED: This must be a collection for the many-to-many relationship with Permission via PagePermission
    public virtual ICollection<PagePermission> PagePermissions { get; set; } = new List<PagePermission>();

    // Keep other collections as they are
    public virtual ICollection<RolePage> RolePages { get; set; } = new List<RolePage>();

}
