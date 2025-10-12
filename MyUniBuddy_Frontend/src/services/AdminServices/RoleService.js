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

const RoleService = {
   getRoles: async () => handleRequest(httpClient.get(apiConfig.Role.getAll)),
   createRole: async (Role) => handleRequest(httpClient.post(apiConfig.Role.create, Role)),
   getRoleById: async (RoleID) => handleRequest(httpClient.get(apiConfig.Role.getRolesById(RoleID))),
   updateRole: async (RoleId, updatedData) => handleRequest(httpClient.put(apiConfig.Role.update(RoleId), updatedData)),
   deleteRoleById: async (RoleID) => handleRequest(httpClient.delete(apiConfig.Role.delete(RoleID))),
  };
export default RoleService;
