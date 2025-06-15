import { useState, useEffect, useCallback } from "react";
import { chatService } from "../services/chatService";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeConversation, setActiveConversation] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("harvestlink_token");
    if (!token) return;

    const socket = chatService.initSocket(token);

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
      if (message.conversationId !== activeConversation?.id) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    // Load conversations
    loadConversations();
    loadUnreadCount();

    return () => {
      chatService.disconnect();
    };
  }, []);

  const loadConversations = async () => {
    try {
      const data = await chatService.getConversations();
      setConversations(data);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const data = await chatService.getUnreadCount();
      setUnreadCount(data.count);
    } catch (error) {
      console.error("Failed to load unread count:", error);
    }
  };

  const loadChatHistory = async (userId) => {
    try {
      const data = await chatService.getChatHistory(userId);
      setMessages(data);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  const sendMessage = useCallback((recipientId, content) => {
    try {
      chatService.sendMessage(recipientId, content);
      // Optimistically add message to state
      const newMessage = {
        id: Date.now(),
        content,
        senderId: "currentUser", // This should be replaced with actual user ID
        recipientId,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, []);

  const markConversationAsRead = async (conversationId) => {
    try {
      await chatService.markAsRead(conversationId);
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark conversation as read:", error);
    }
  };

  const startConversation = async (userId) => {
    setActiveConversation({ id: userId });
    await loadChatHistory(userId);
  };

  return {
    messages,
    conversations,
    unreadCount,
    isConnected,
    activeConversation,
    sendMessage,
    startConversation,
    markConversationAsRead,
    loadChatHistory,
  };
}
