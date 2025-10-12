// stores/permissionStore.js
import { create } from 'zustand';

// Helper function to flatten the nested permission data
const flattenPermissions = (pages) => {
  const permissionsMap = new Map();
  const processPages = (pageList) => {
    if (!pageList) return;
    pageList.forEach(page => {
      const { key, permission, subPages } = page;
      if (key && permission) {
        permissionsMap.set(key, permission);
      }
      if (subPages && subPages.length > 0) {
        processPages(subPages);
      }
    });
  };
  processPages(pages);
  return permissionsMap;
};

export const usePermissionStore = create((set, get) => ({
  // The full nested layout structure for building the menu
  layout: [],
  // A flattened map for efficient permission checks
  permissionsMap: new Map(),
  loading: false,

  // Action to set the permissions and layout data
  setLayout: (data) => {
    const flattened = flattenPermissions(data);
    set({ layout: data, permissionsMap: flattened });
  },

  setLoading: (isLoading) => {
    set({ loading: isLoading });
  },

  // A public method to check for a specific permission
  hasPermission: (pageKey, permissionType) => {
    const pagePermissions = get().permissionsMap.get(pageKey);
    if (!pagePermissions) return false;
    return pagePermissions.some(p => p.permissionType === permissionType && p.isAllowed);
  },
}));
