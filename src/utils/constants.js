export const API_URL = import.meta.env.VITE_API_URL || "";

// Remove `/api` safely to get backend root
export const BACKEND_URL = API_URL
  ? API_URL.replace("/api", "")
  : "";

// Base URL for uploaded files (receipts, images)
export const FILE_BASE_URL = BACKEND_URL;
