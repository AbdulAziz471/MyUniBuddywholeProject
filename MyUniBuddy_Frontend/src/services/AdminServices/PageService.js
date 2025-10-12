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

const PageService = {
   getPages: async () => handleRequest(httpClient.get(apiConfig.Page.getAll)),
   createPage: async (PageData) => handleRequest(httpClient.post(apiConfig.Page.create, PageData)),
   getPageById: async (PageID) => handleRequest(httpClient.get(apiConfig.Page.getPagesById(PageID))),
   updatePage: async (PageId, updatedData) => handleRequest(httpClient.put(apiConfig.Page.update(PageId), updatedData)),
   deletePageById: async (PageID) => handleRequest(httpClient.delete(apiConfig.Page.delete(PageID))),
  };
export default PageService;
