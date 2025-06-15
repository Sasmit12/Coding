// Messaging service for in-app chat functionality
// Note: In a real app, you would use WebSockets or a service like Socket.IO

export const messagingService = {
  // Mock conversations data
  conversations: [
    {
      id: "conv-1",
      participants: [
        { id: "farmer1", name: "Green Valley Farm", role: "farmer", avatar: "👩‍🌾" },
        { id: "consumer1", name: "John Smith", role: "consumer", avatar: "👤" }
      ],
      lastMessage: {
        id: "msg-5",
        senderId: "consumer1",
        content: "When will my order be delivered?",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false
      },
      unreadCount: 1,
      orderId: "ORD-045"
    },
    {
      id: "conv-2",
      participants: [
        { id: "farmer1", name: "Green Valley Farm", role: "farmer", avatar: "👩‍🌾" },
        { id: "consumer2", name: "Sarah Johnson", role: "consumer", avatar: "👤" }
      ],
      lastMessage: {
        id: "msg-8",
        senderId: "farmer1",
        content: "Your tomatoes are ready for harvest!",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        read: true
      },
      unreadCount: 0,
      orderId: "ORD-044"
    }
  ],

  // Mock messages for each conversation
  messages: {
    "conv-1": [
      {
        id: "msg-1",
        senderId: "consumer1",
        content: "Hi! I'm interested in your organic tomatoes",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true
      },
      {
        id: "msg-2",
        senderId: "farmer1",
        content: "Hello! Yes, we have fresh organic tomatoes available. How many would you like?",
        timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000), // 23 hours ago
        read: true
      },
      {
        id: "msg-3",
        senderId: "consumer1",
        content: "I'd like 2 pounds please",
        timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000), // 22 hours ago
        read: true
      },
      {
        id: "msg-4",
        senderId: "farmer1",
        content: "Perfect! I'll add that to your order. Total will be $7.98",
        timestamp: new Date(Date.now() - 21 * 60 * 60 * 1000), // 21 hours ago
        read: true
      },
      {
        id: "msg-5",
        senderId: "consumer1",
        content: "When will my order be delivered?",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false
      }
    ],
    "conv-2": [
      {
        id: "msg-6",
        senderId: "consumer2",
        content: "Do you have any fresh eggs available?",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        read: true
      },
      {
        id: "msg-7",
        senderId: "farmer1",
        content: "Yes! We have fresh eggs from our free-range chickens. $4.99 per dozen",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true
      },
      {
        id: "msg-8",
        senderId: "farmer1",
        content: "Your tomatoes are ready for harvest!",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        read: true
      }
    ]
  },

  // Get all conversations for a user
  async getConversations(userId) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter conversations where the user is a participant
      const userConversations = this.conversations.filter(conv =>
        conv.participants.some(p => p.id === userId)
      );
      
      return userConversations;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  },

  // Get messages for a specific conversation
  async getMessages(conversationId) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return this.messages[conversationId] || [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  // Send a new message
  async sendMessage(conversationId, senderId, content) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const newMessage = {
        id: `msg-${Date.now()}`,
        senderId,
        content,
        timestamp: new Date(),
        read: false
      };
      
      // Add message to the conversation
      if (!this.messages[conversationId]) {
        this.messages[conversationId] = [];
      }
      this.messages[conversationId].push(newMessage);
      
      // Update conversation's last message
      const conversation = this.conversations.find(conv => conv.id === conversationId);
      if (conversation) {
        conversation.lastMessage = newMessage;
        conversation.unreadCount = this.messages[conversationId].filter(msg => !msg.read && msg.senderId !== senderId).length;
      }
      
      return newMessage;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },

  // Mark messages as read
  async markAsRead(conversationId, userId) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (this.messages[conversationId]) {
        this.messages[conversationId].forEach(message => {
          if (message.senderId !== userId && !message.read) {
            message.read = true;
          }
        });
      }
      
      // Update conversation unread count
      const conversation = this.conversations.find(conv => conv.id === conversationId);
      if (conversation) {
        conversation.unreadCount = 0;
      }
      
      return true;
    } catch (error) {
      console.error("Error marking messages as read:", error);
      throw error;
    }
  },

  // Create a new conversation
  async createConversation(participants, orderId = null) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newConversation = {
        id: `conv-${Date.now()}`,
        participants,
        lastMessage: null,
        unreadCount: 0,
        orderId
      };
      
      this.conversations.push(newConversation);
      this.messages[newConversation.id] = [];
      
      return newConversation;
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw error;
    }
  },

  // Get unread message count for a user
  async getUnreadCount(userId) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const userConversations = this.conversations.filter(conv =>
        conv.participants.some(p => p.id === userId)
      );
      
      return userConversations.reduce((total, conv) => total + conv.unreadCount, 0);
    } catch (error) {
      console.error("Error getting unread count:", error);
      throw error;
    }
  },

  // Search conversations
  async searchConversations(userId, query) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const userConversations = this.conversations.filter(conv =>
        conv.participants.some(p => p.id === userId)
      );
      
      return userConversations.filter(conv =>
        conv.participants.some(p => 
          p.name.toLowerCase().includes(query.toLowerCase())
        ) ||
        conv.lastMessage?.content.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching conversations:", error);
      throw error;
    }
  },

  // Delete a conversation
  async deleteConversation(conversationId) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      this.conversations = this.conversations.filter(conv => conv.id !== conversationId);
      delete this.messages[conversationId];
      
      return true;
    } catch (error) {
      console.error("Error deleting conversation:", error);
      throw error;
    }
  }
}; 