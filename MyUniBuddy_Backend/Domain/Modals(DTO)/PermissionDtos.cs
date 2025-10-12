using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// Domain/Modals_DTO_/PermissionDto.cs
// This DTO will be used for returning Permission data from the API.
namespace Domain.Modals_DTO_
{
    public class PermissionDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateOnly? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
    }

    // Domain/Modals_DTO_/CreatePermissionDto.cs                
    // This DTO will be used for input when creating a new Permission.
    public class CreatePermissionDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; } // Assuming CreatedBy is passed in creation
    }

    // Domain/Modals_DTO_/UpdatePermissionDto.cs
    // This DTO will be used for input when updating an existing Permission.
    public class UpdatePermissionDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        // You might include other fields that can be updated, e.g., ModifiedBy
    }
}

