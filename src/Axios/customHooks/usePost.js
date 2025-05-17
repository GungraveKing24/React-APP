import { useState } from 'react';
import { HTTP } from '../Axios.js';

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null); // <- nuevo

  const postData = async (endpoint, data, withAuth = false) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    setStatus(null); // <- resetear status en cada petición

    try {
      const res = await HTTP.post(endpoint, data, { withAuth });
      setResponse(res.data);
      setStatus(res.status); // <- guardar status HTTP
      return {
        data: res.data,
        status: res.status,
      };
    } catch (err) {
      setError(err);
      return {
        data: null,
        status: err?.response?.status || null,
        error: err,
      };
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response, status };
};

// Usage: const { postData, loading, error, response, status } = usePost();

// Type true at the end depending if you want to post with auth
// const { status } = await postData("/path", formData ,true);