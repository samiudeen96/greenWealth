import axios from "axios";

// This is your axios instance
export const medusaApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MEDUSA_URL,
  headers: {
    "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    "x-medusa-sales-channel-id": process.env.NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID,
  },
});

// Request interceptor to add customer token automatically
medusaApi.interceptors.request.use((config) => {
  // Get token from localStorage (or Zustand state)
  const token = localStorage.getItem("customer_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});
