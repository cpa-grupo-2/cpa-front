import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cpa-back-wldbl6thya-rj.a.run.app',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
  withCredentials: true
});


api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export default api;
