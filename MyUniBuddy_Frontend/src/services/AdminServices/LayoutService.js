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

const LayoutService = {
  getLayout: async (userId) => handleRequest(httpClient.get(apiConfig.DashboardLayout.getLayoutByUserId(userId))),
    getAcademicLayout: async (userId) => handleRequest(httpClient.get(apiConfig.DashboardLayout.getAcadmicSumary)),
      getFinanceLayout: async (userId) => handleRequest(httpClient.get(apiConfig.DashboardLayout.getFinanceSumary)),
  };
export default LayoutService;
