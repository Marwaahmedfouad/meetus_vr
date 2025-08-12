import axios from 'axios';
import Cookies from 'js-cookie'; 

const BASE = 'https://api-yeshtery.dev.meetusvr.com/v1';

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
});


api.interceptors.request.use((config) => {
  const token = Cookies.get('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginRequest = async ({ email, password }) => {
  const payload = { email, password, isEmployee: true };
  const response = await api.post('/yeshtery/token', payload);
  
  Cookies.set('token', response.data.token, { expires: 1, secure: true, sameSite: 'Strict' });

  return response.data;
};

export const getUserInfo = async () => {
  const response = await api.get('/user/info');
  return response.data;
};

export const logoutRequest = async () => {
  Cookies.remove('token');
};