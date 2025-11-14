const API_URL = process.env.REACT_APP_API_URL;

const getHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const token = localStorage.getItem('token');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  return headers;
};

export const apiFetch = (endpoint, options = {}) => {
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: getHeaders()
  });
};
