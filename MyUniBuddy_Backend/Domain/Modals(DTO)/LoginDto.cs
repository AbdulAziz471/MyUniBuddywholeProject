using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Modals_DTO_
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }


    public class LoginResponseDto
    {
        public string Token { get; set; } = null!;
        public string Email { get; set; } = null!;
        public Guid UserId { get; set; }
        public string UserName { get; set; } = null!;

        public string Role { get; set; }
    }


}
