import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  timeout: 12000,
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
