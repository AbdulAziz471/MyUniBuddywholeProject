using System;
using System.Collections.Generic;

namespace Domain.Entities;
public partial class PagePermission
{
    public Guid PageId { get; set; }

    public Guid PermissionId { get; set; }

    public virtual Page Page { get; set; } = null!;

    public virtual Permission Permission { get; set; } = null!;
}
