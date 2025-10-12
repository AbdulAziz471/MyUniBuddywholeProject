using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Modals_DTO_
{
    // Domain/Modals_DTO_/UserDto.cs
    public class UserDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public List<UserRoleDto> Roles { get; set; } = new();
    }

    public class UserRoleDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
    }
    // Domain/Modals_DTO_/UserCreateDto.cs
    public class UserCreateDto
    {
        public string UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string Password { get; set; } = null!;

        public List<Guid> RoleIds { get; set; } = new();
    }

   
    public class UserUpdateDto
    {
        public string UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public List<Guid> RoleIds { get; set; } = new();
    }



    public class UserChangePasswordDto {


        public Guid UserId { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
