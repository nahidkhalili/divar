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
    console.log("📌 REQUEST →", request.url);
    console.log("📌 ACCESS TOKEN FROM COOKIE:", accessToken);
    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;
      console.log("📌 FINAL REQUEST HEADERS:", request.headers);
      return request;
    } else {
      console.warn("❌ NO ACCESS TOKEN FOUND");
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
      if (!res) return;
      console.log("api res:", res);
      setCookie(res);
      return api(originalRequest);
    }
  }
);

export default api;
