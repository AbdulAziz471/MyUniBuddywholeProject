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

const AdminUserService = {
  getAdminUsers: async () => handleRequest(httpClient.get(apiConfig.adminUser.getAll)),
  createAdminUser: async (AdminUser) =>handleRequest(httpClient.post(apiConfig.adminUser.create, AdminUser)),
  getAdminUserById: async (id) =>handleRequest(httpClient.get(apiConfig.AdminUser.getAdminUsersById(id))),
  updateAdminUser: async (id, updatedData) =>handleRequest(httpClient.put(apiConfig.adminUser.update(id), updatedData)),
  };
export default AdminUserService;
