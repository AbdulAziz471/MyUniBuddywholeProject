using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class RolePage
{
    public Guid Id { get; set; }

    public Guid? RoleId { get; set; }

    public Guid? PageId { get; set; }

    public Guid? PermissionId { get; set; }

    public virtual Page? Page { get; set; }

    public virtual Permission? Permission { get; set; }

    public virtual AspNetRole? Role { get; set; }
}
