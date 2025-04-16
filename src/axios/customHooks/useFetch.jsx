// src/Axios/useFetch.js
import { useEffect, useState } from 'react';
import { HTTP } from '../axios';

export const useFetch = (endpoint, withAuth = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setStatus(null)

      try {
        const response = await HTTP.get(endpoint, { withAuth });
        setData(response.data);
        setStatus(response.status)
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, withAuth]);

  return { data, loading, error, status };
};

//Usage
// without auth: const { data, loading, error } = useFetch('/path');
// with auth: const { data, loading, error } = useFetch('/path', true);