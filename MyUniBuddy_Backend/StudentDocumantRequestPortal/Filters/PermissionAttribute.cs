using Microsoft.AspNetCore.Mvc;

namespace StudentDocumantRequestPortal.Filters
{
    public class PermissionAttribute : TypeFilterAttribute
    {
        public PermissionAttribute(string moduleName, string pageName, string requiredPermission)
            : base(typeof(PermissionFilter))
        {
            Arguments = new object[] { moduleName, pageName, requiredPermission };
        }
    }

}
