using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class Permission
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateOnly? CreatedOn { get; set; }
    public string? CreatedBy { get; set; }

    // CORRECTED: This must be a collection for the many-to-many relationship with Page via PagePermission
    public virtual ICollection<PagePermission> PagePermissions { get; set; } = new List<PagePermission>();

    // Keep other collections as they are
    public virtual ICollection<RolePage> RolePages { get; set; } = new List<RolePage>();
}
