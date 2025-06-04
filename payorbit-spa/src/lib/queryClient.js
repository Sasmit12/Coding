// If you use React Query, this sets up the QueryClient
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

// Example apiRequest function (customize as needed)
export async function apiRequest(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
}