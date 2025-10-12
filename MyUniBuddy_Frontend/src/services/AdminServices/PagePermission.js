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

const PagePermissionService = {
    getPageWithAllPermission: async () => handleRequest(httpClient.get(apiConfig.PagePermission.getAllPagesWithPermission())),
    getPagePermissionById: async (id) => handleRequest(httpClient.get(apiConfig.PagePermission.getById(id))),
    UpdatePagePermissionById: async (updatedData) => handleRequest(httpClient.post(apiConfig.PagePermission.update(), updatedData)),
};
export default PagePermissionService;
