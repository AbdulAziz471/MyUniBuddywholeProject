
export const config = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ,
  API_Key: import.meta.env.VITE_API_KEY ,
  DocbaseUrl: "https://localhost:7239" ,
  
  timeout: 30000,
  retryAttempts: 3,
};
