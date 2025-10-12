using Domain.Modals_DTO_;
using Microsoft.EntityFrameworkCore;
using Persistence.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Persistence.Database;

namespace Persistence.Services
{
    public class DDLServices : IDDL
    {
        private readonly DbStudentRequestContext _context;

        public DDLServices(DbStudentRequestContext context)
        {
            _context = context;
        }
     
    }
}
