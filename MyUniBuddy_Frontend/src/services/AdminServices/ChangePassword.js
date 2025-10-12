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

const PasswordService = {
   changePassword: async (data) => handleRequest(httpClient.post(apiConfig.Password.changePassword, data)),
   forgetPassword: async (data) => handleRequest(httpClient.post(apiConfig.Password.forgetPassowrd, data)),
  };
export default PasswordService;
