using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Modals_DTO_
{
    // Domain/Modals_DTO_/RoleDto.cs
    public class RoleDto
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? NormalizedName { get; set; }
    }

    // Domain/Modals_DTO_/RoleCreateUpdateDto.cs
    public class RoleCreateUpdateDto
    {
        public string? Name { get; set; }
    }

}
