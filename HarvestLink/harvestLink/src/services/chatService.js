import { io } from "socket.io-client";
import api from "./api";

let socket;

export const chatService = {
  // Initialize socket connection
  initSocket: (token) => {
    socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000", {
      auth: {
        token,
      },
    });

    socket.on("connect", () => {
      console.log("Connected to chat server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from chat server");
    });

    return socket;
  },

  // Get socket instance
  getSocket: () => socket,

  // Get chat history with a user
  getChatHistory: async (userId) => {
    const response = await api.get(`/chat/history/${userId}`);
    return response.data;
  },

  // Get all chat conversations
  getConversations: async () => {
    const response = await api.get("/chat/conversations");
    return response.data;
  },

  // Send a message
  sendMessage: (recipientId, content) => {
    if (!socket) throw new Error("Socket not initialized");
    socket.emit("send_message", { recipientId, content });
  },

  // Mark messages as read
  markAsRead: async (conversationId) => {
    const response = await api.post(`/chat/mark-read/${conversationId}`);
    return response.data;
  },

  // Get unread message count
  getUnreadCount: async () => {
    const response = await api.get("/chat/unread-count");
    return response.data;
  },

  // Disconnect socket
  disconnect: () => {
    if (socket) {
      socket.disconnect();
    }
  },
};
