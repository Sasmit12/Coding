import { apiRequest } from "./queryClient";

// Remove TypeScript types for plain JS
const getAuthHeaders = () => ({
  "X-User-Id": "admin-user-1",
  "X-User-Role": "admin",
});

export const api = {
  sessions: {
    getAll: async (params) => {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });
      }
      const url = `/api/sessions${queryParams.toString() ? "?" + queryParams.toString() : ""}`;
      const response = await fetch(url, {
        headers: getAuthHeaders(),
        credentials: "include",
      });
      return response.json();
    },
    create: async (session) => {
      return apiRequest("POST", "/api/sessions", session);
    },
    update: async (id, updates) => {
      return apiRequest("PUT", `/api/sessions/${id}`, updates);
    },
  },
  mentors: {
    getAll: async () => {
      const response = await fetch("/api/mentors", {
        headers: getAuthHeaders(),
        credentials: "include",
      });
      return response.json();
    },
    getById: async (id) => {
      const response = await fetch(`/api/mentors/${id}`, {
        headers: getAuthHeaders(),
        credentials: "include",
      });
      return response.json();
    },
    create: async (mentor) => {
      return apiRequest("POST", "/api/mentors", mentor);
    },
    update: async (id, updates) => {
      return apiRequest("PUT", `/api/mentors/${id}`, updates);
    },
  },
  payouts: {
    getAll: async (mentorId) => {
      const url = `/api/payouts${mentorId ? "?mentorId=" + mentorId : ""}`;
      const response = await fetch(url, {
        headers: getAuthHeaders(),
        credentials: "include",
      });
      return response.json();
    },
    getById: async (id) => {
      const response = await fetch(`/api/payouts/${id}`, {
        headers: getAuthHeaders(),
        credentials: "include",
      });
      return response.json();
    },
    calculate: async (data) => {
      return apiRequest("POST", "/api/payouts/calculate", data);
    },
    updateStatus: async (id, status) => {
      return apiRequest("PUT", `/api/payouts/${id}/status`, { status });
    },
  },
  receipts: {
    getByMentor: async (mentorId) => {
      const response = await fetch(`/api/receipts/${mentorId}`, {
        headers: getAuthHeaders(),
        credentials: "include",
      });
      return response.json();
    },
    generate: async (payoutId) => {
      return apiRequest("POST", "/api/receipts", { payoutId });
    },
  },
  chat: {
    getHistory: async (threadId) => {
      const response = await fetch(`/api/chat/history/${threadId}`, {
        headers: getAuthHeaders(),
        credentials: "include",
      });
      return response.json();
    },
    sendMessage: async (threadId, message) => {
      return apiRequest("POST", "/api/chat/message", { threadId, message });
    },
  },
  auditLogs: {
    getAll: async (params) => {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });
      }
      const url = `/api/audit-logs${queryParams.toString() ? "?" + queryParams.toString() : ""}`;
      const response = await fetch(url, {
        headers: getAuthHeaders(),
        credentials: "include",
      });
      return response.json();
    },
  },
};