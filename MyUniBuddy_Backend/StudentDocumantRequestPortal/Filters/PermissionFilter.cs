using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence.Database;
using Microsoft.Extensions.DependencyInjection;
namespace StudentDocumantRequestPortal.Filters
{
    public class PermissionFilter : IAsyncAuthorizationFilter
    {
        private readonly string _moduleName; // Although not used, it's good practice to accept it
        private readonly string _pageName;
        private readonly string _requiredPermission;

        // The constructor now directly matches the arguments passed from the attribute
        public PermissionFilter(string moduleName, string pageName, string requiredPermission)
        {
            _moduleName = moduleName;
            _pageName = pageName;
            _requiredPermission = requiredPermission;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            // Resolve the DbContext from the current request's service provider
            var _context = context.HttpContext.RequestServices.GetRequiredService<DbStudentRequestContext>();

            var user = context.HttpContext.User;
            var userId = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                context.Result = new ForbidResult();
                return;
            }

            var applicationUser = await _context.AspNetUsers
                .Include(u => u.Roles)
                .ThenInclude(r => r.RolePages)
                .ThenInclude(rp => rp.Page)
                .Include(u => u.Roles)
                .ThenInclude(r => r.RolePages)
                .ThenInclude(rp => rp.Permission)
                .FirstOrDefaultAsync(u => u.Id.ToString() == userId);

            if (applicationUser == null)
            {
                context.Result = new ForbidResult();
                return;
            }

            var userRoles = applicationUser.Roles.ToList();

            if (!PermissionHelper.HasPermission(userRoles, _pageName, _requiredPermission))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}