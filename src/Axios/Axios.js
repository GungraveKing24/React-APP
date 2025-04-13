import axios from 'axios'

const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const authRequest = {
  get: (url, config = {}) => {
    return axiosInstance.get(url, {
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
  },

  post: (url, data, config = {}) => {
    return axiosInstance.post(url, data, {
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
  },

  //PATCH METHOD
};