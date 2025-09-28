import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './services/authService';

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
  withCredentials: true, // Include HTTP-only cookies in requests
});

// Store access token in memory
let accessToken: string | null = null;
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason: any) => void;
}> = [];

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  console.log('Access token set:', token ? 'Set' : 'Cleared');
};

export const getAccessToken = () => {
  console.log('Getting access token:', accessToken);
  return accessToken;
};

// Process queued requests after refresh
const processQueue = (error: any, token: string | null = null) => {
  console.log('Processing queue:', { error, token });
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Add request interceptor to include access token in headers
authApi.interceptors.request.use(
  (config) => {
    console.log('Request interceptor:', { url: config.url, hasToken: !!accessToken });
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
authApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('Response interceptor triggered:', { url: originalRequest.url, status: error.response?.status });

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        console.log('Already refreshing, queuing request:', originalRequest.url);
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(authApi(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('Interceptor: Attempting to refresh token');
        const newTokens = await authService.refreshToken();
        console.log('Interceptor: Token refreshed successfully:', newTokens.access_token);
        setAccessToken(newTokens.access_token);
        processQueue(null, newTokens.access_token);
        originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
        return authApi(originalRequest); // Retry the original request
      } catch (refreshError: any) {
        console.error('Interceptor: Refresh token failed:', refreshError);
        processQueue(refreshError);
        setAccessToken(null);
        window.location.href = '/login';
        return Promise.reject(new Error('Session expired, please log in again'));
      } finally {
        isRefreshing = false;
        console.log('Interceptor: Refresh completed, isRefreshing reset');
      }
    }

    console.error('Response interceptor error:', error);
    return Promise.reject(error);
  }
);

export default authApi;