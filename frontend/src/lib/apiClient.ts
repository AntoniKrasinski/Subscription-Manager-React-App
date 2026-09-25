import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// RefreshToken creates new jwt when req fails
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.config);
    if (error.response.status !== 401 || error.config._retry) {
      return Promise.reject(error);
    }
    try {
      error.config._retry = true;
      await api.post("/auth/refresh");
    } catch (error) {
      return Promise.reject(error);
    }
    console.log("jwt refreshed!!!!");
    return api.request(error.config);
  },
);
