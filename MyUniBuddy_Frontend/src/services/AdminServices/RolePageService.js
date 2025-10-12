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

const RolePageService = {
   getRolePermissionById: async (RoleID) => handleRequest(httpClient.get(apiConfig.RolePermission.getById(RoleID))),
  UpdateRolePermissionById: async (updatedData) => handleRequest(httpClient.post(apiConfig.RolePermission.update(), updatedData)),
  };
export default RolePageService;
