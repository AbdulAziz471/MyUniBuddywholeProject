using Microsoft.AspNetCore.Mvc;
using Persistence.Interfaces;
using Persistence.Services;
using Domain.Entities;
namespace StudentDocumantRequestPortal.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DDLController : ControllerBase
    {
        private readonly IDDL _DDLServices;

        public DDLController(IDDL _dDLServices)
        {
            _DDLServices = _dDLServices;
        }
      
    }
}
