import httpClient from "../../config/httpClient";
import { apiConfig } from "../../config/apiConfig";

const STORAGE_KEY = "userLoginInfo";

const parseStored = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse stored login info", e);
    return null;
  }
};

const clearStored = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data ?? response; // some clients use response.data, some return plain
  } catch (error) {
    console.error("API Error:", error?.data || error?.message || error);
    throw error;
  }
};

const AuthService = {
  login: async (credentials) => {
    const response = await handleRequest(
      httpClient.post(apiConfig.auth.login, credentials)
    );

    // Normalize to { token, user }
    return {
      token: response.token,
      user: {
        id: response.userId,
        email: response.email,
        name: response.userName,
        role: response.role ,
      },
    };
  },

  // Ensure body matches required API shape: { fullName, email, password }
  registorUser: async (user) =>
    handleRequest(httpClient.post(apiConfig.auth.registor, user)),

  /**
   * Logout without forcing full reload.
   * @param navigate optional react-router navigate function
   */
  logout: (navigate) => {
    clearStored();
    if (typeof navigate === "function") navigate("/admin/login");
    else
      console.warn(
        "No navigate function provided to AuthService.logout; you should redirect manually."
      );
  },

  isAuthenticated: () => {
    const info = parseStored();
    return !!(info && info.token);
  },

  getLoginInfo: () => parseStored(),
};

export default AuthService;
