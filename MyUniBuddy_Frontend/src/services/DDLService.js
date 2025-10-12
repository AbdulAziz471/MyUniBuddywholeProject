import { apiConfig } from "../config/apiConfig";
import { config } from "../config/config";
import httpClient from "../config/httpClient";
const DDLService = {
  };

const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export default DDLService;
