// config/httpClient.js

import axios from 'axios';
import { config } from './config';

const STORAGE_KEY = 'userLoginInfo';

let navigateFn = null; // will be set from a React component

export const registerNavigate = (nav) => {
  navigateFn = nav;
};

const getToken = () => {
  try {
    const raw =
      sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { token } = JSON.parse(raw);
    return token;
  } catch (e) {
    console.error("Failed to read token from storage", e);
    return null;
  }
};

const clearLoginInfo = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const httpClient = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'AppKey': config.API_Key,
  },
});

httpClient.interceptors.request.use(
  (cfg) => {
    const token = getToken();
    if (token) {
      cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) {
      console.error("Unauthorized: Token expired or invalid. Redirecting to login...");
      clearLoginInfo();
      if (typeof navigateFn === 'function') {
        navigateFn('/admin/login');
      } else {
        window.location.href = '/admin/login'; // proper fallback
      }
    }

    const apiError = {
      status,
      message: data?.message || error.message,
      data,
      isApiError: true,
    };

    return Promise.reject(apiError);
  }
);


export default httpClient;
