import type { ApiResponse } from "~/types/api";

export const getErrorMessage = (err: any, fallback: string): string => {
  if (process.client && !navigator.onLine) {
    return "No internet connection. Please check your network.";
  }

  const errorData = err.response?._data as ApiResponse<null>;

  if (err.name === 'AbortError' || err.message?.includes('timeout')) {
    return "Request timeout. Your connection might be too slow.";
  }

  return errorData?.message || fallback;
};

export const getFieldErrors = (err: any): Record<string, string> => {
  const errorData = err.response?._data as ApiResponse<null>;
  return errorData?.errors || {};
};