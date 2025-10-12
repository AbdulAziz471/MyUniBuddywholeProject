    using Domain.Modals_DTO_;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace Persistence.Interfaces
    {
        public interface IPagePermission
        { 
            Task UpdatePagePermissionsAsync(Guid pageId, List<Guid> permissionIds);
             Task<List<PagePermissionDto>> GetPagePermissionsByPageIdAsync(Guid pageId);

        Task<List<PageWithPermissionsDto>> GetPagesWithAllPermissionsAsync();
    }
    }
