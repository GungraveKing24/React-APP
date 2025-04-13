// src/Axios/useFetch.js
import { useEffect, useState } from 'react';
import { axiosInstance } from './Axios';

export const useFetch = (endpoint, useAuth = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const config = {};
        if (useAuth) {
          const token = localStorage.getItem('token');
          config.headers = {
            Authorization: `Bearer ${token}`,
          };
        }

        const response = await axiosInstance.get(endpoint, config);
        setData(response.data);
      } catch (err) {
        console.error('Error reciviendo la información:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, useAuth]);

  return { data, loading, error };
};
