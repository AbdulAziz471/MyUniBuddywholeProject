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

const MeetingRequestService = {
  // Get all meeting requests (admin view)
  getAll: async () => handleRequest(httpClient.get(apiConfig.MeetingRequest.getAll)),

  // Get meeting requests for a student by ID
  getByStudentId: async (studentId) =>
    handleRequest(httpClient.get(apiConfig.MeetingRequest.getByStudentId(studentId))),

  // Create (submit) a meeting request (student)
  createRequest: async (requestData) =>
    handleRequest(httpClient.post(apiConfig.MeetingRequest.postRequest, requestData)),

  // Approve a request (admin)
  approve: async (id, meetLink) =>
    handleRequest(httpClient.post(apiConfig.MeetingRequest.approved(id), { meetLink })),

  // Reject a request (admin)
  reject: async (id, adminNote) =>
    handleRequest(
      httpClient.post(
        apiConfig.MeetingRequest.Reject(id),
        JSON.stringify(adminNote),                         // <-- not { adminNote }
        { headers: { "Content-Type": "application/json" } } // ensure JSON content-type
      )
    ),
};

export default MeetingRequestService;
