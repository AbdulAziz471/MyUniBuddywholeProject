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

const FYPTitleSuggestionService = {
   getFYPTitleSuggestions: async () => handleRequest(httpClient.get(apiConfig.FYPTitleSuggestion.getAll)),
   createFYPTitleSuggestion: async (FYPTitleSuggestionData) => handleRequest(httpClient.post(apiConfig.FYPTitleSuggestion.create, FYPTitleSuggestionData)),
   getFYPTitleSuggestionById: async (FYPTitleSuggestionID) => handleRequest(httpClient.get(apiConfig.FYPTitleSuggestion.getFYPTitleSuggestionsById(FYPTitleSuggestionID))),
   updateFYPTitleSuggestion: async (FYPTitleSuggestionId, updatedData) => handleRequest(httpClient.put(apiConfig.FYPTitleSuggestion.update(FYPTitleSuggestionId), updatedData)),
   deleteFYPTitleSuggestionById: async (FYPTitleSuggestionID) => handleRequest(httpClient.delete(apiConfig.FYPTitleSuggestion.delete(FYPTitleSuggestionID))),
  };
export default FYPTitleSuggestionService;
