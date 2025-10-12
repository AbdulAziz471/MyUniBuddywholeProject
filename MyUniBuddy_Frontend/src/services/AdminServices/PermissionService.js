import { apiConfig } from "../../config/apiConfig";
import httpClient from "../../config/httpClient";

const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

const PermissionService = {
   getPermissions: async () => handleRequest(httpClient.get(apiConfig.Permission.getAll)),
   createPermission: async (permissionData) => handleRequest(httpClient.post(apiConfig.Permission.create, permissionData)),
   getPermissionById: async (PermissionID) => handleRequest(httpClient.get(apiConfig.Permission.getPermissionsById(PermissionID))),
   updatePermission: async (PermissionId, updatedData) => handleRequest(httpClient.put(apiConfig.Permission.update(PermissionId), updatedData)),
   deletePermissionById: async (PermissionID) => handleRequest(httpClient.delete(apiConfig.Permission.delete(PermissionID))),
  };
export default PermissionService;
