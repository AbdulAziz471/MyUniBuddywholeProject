using Domain.Modals_DTO_;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Interfaces
{
    public interface IChangePassword
    {
        Task ChangePassword(Guid id, UserChangePasswordDto dto);
    }
}
