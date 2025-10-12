using Domain.Modals_DTO_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IAuth
    {
        Task<LoginResponseDto> LoginAsync(LoginDto model);
        Task<Guid> RegistorAsync(RegistorDto dto);

    }
}
