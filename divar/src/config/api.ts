import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import { getNewToken } from "../services/token";

// ============ API CONFIGS ================ //
// an axios instance for json
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========== REQUEST INTERCEPTORS ============= //
// api request interceptor
api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;

      return request;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =========== RESPONSE INTERCEPTOR ============= //
// api response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await getNewToken();
      if (!res?.res) return;
      setCookie(res.res.data);
      return api(originalRequest);
    }
  }
);

export default api;
