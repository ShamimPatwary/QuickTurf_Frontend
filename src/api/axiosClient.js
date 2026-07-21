import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const platformClient = axios.create({ baseURL: BASE_URL });
export const turfClient = axios.create({ baseURL: BASE_URL });
export const publicClient = axios.create({ baseURL: BASE_URL });

platformClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("qt_platform_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

turfClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("qt_turf_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function attachUnauthorizedHandler(client, tokenKey, redirectPath) {
  client.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem(tokenKey);
        if (window.location.pathname !== redirectPath) {
          window.location.href = redirectPath;
        }
      }
      return Promise.reject(error);
    }
  );
}

attachUnauthorizedHandler(platformClient, "qt_platform_token", "/admin/login");
attachUnauthorizedHandler(turfClient, "qt_turf_token", "/turf-admin/login");

export default BASE_URL;
