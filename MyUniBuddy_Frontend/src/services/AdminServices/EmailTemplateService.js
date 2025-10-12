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

const EmailTemplateService = {
   getEmailTemplate: async () => handleRequest(httpClient.get(apiConfig.EmailTemplate.getAll)),
   createEmailTemplate: async (data) => handleRequest(httpClient.post(apiConfig.EmailTemplate.create, data)),
   getEmailTemplateById: async (id) => handleRequest(httpClient.get(apiConfig.EmailTemplate.getEmailTemplatesById(id))),
   updateEmailTemplate: async (id, data) => handleRequest(httpClient.put(apiConfig.EmailTemplate.update(id), data)),
   deleteEmailTemplateById: async (data) => handleRequest(httpClient.delete(apiConfig.EmailTemplate.delete(data))),
   testEmailTemplate: async (id) => handleRequest(httpClient.delete(apiConfig.EmailTemplate.test(data))),
  };
export default EmailTemplateService;
