import axios from 'axios';
import type  { AxiosInstance, AxiosResponse } from 'axios'

// In-memory store for tokens
let accessToken: string | null = null;

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// API instance without authentication (for public endpoints)
export const publicApi: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API instance with authentication (for protected endpoints)
export const authApi: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
authApi.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
authApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Clear token and redirect to login on 401 (token expired or invalid)
      clearAccessToken();
      // Ensure redirect only happens in browser environment
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(new Error('Session expired, please log in again'));
    }

    return Promise.reject(error);
  }
);

// Token management functions
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export default authApi;