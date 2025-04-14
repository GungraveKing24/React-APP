import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const HTTP = {
  get: (url, { withAuth = false, ...config } = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
      ...(config.headers || {}),
      ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    };

    return axiosInstance.get(url, { ...config, headers });
  },

  post: (url, data, { withAuth = false, ...config } = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
      ...(config.headers || {}),
      ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    };

    return axiosInstance.post(url, data, { ...config, headers });
  }

  //PATCH METHOD
};