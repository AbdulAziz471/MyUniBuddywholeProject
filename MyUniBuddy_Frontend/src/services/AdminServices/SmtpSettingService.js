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

const SmtpSettingService = {
   getSmtpSetting: async () => handleRequest(httpClient.get(apiConfig.SmtpSetting.getAll)),
   createSmtpSetting: async (data) => handleRequest(httpClient.post(apiConfig.SmtpSetting.create, data)),
   getSmtpSettingById: async (id) => handleRequest(httpClient.get(apiConfig.SmtpSetting.getSmtpSettingsById(id))),
   updateSmtpSetting: async (id, data) => handleRequest(httpClient.put(apiConfig.SmtpSetting.update(id), data)),
   deleteSmtpSettingById: async (data) => handleRequest(httpClient.delete(apiConfig.SmtpSetting.delete(data))),
   testSmtpSetting: async (id) => handleRequest(httpClient.delete(apiConfig.SmtpSetting.test(data))),
  };
export default SmtpSettingService;
