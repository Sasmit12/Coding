import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../hooks/useChat";
import Button from "../common/Button";
import Input from "../common/Input";

export default function Chat() {
  const { user } = useAuth();
  const {
    messages,
    conversations,
    unreadCount,
    isConnected,
    activeConversation,
    sendMessage,
    startConversation,
    markConversationAsRead,
  } = useChat();

  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as read when conversation is active
  useEffect(() => {
    if (activeConversation) {
      markConversationAsRead(activeConversation.id);
    }
  }, [activeConversation, markConversationAsRead]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;

    sendMessage(activeConversation.id, messageInput.trim());
    setMessageInput("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Messages</h2>
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="overflow-y-auto h-full">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => startConversation(conversation.id)}
              className={`w-full p-4 text-left hover:bg-gray-50 flex items-center space-x-4
                ${activeConversation?.id === conversation.id ? "bg-gray-100" : ""}
                ${conversation.unread ? "font-semibold" : ""}`}
            >
              <div className="flex-shrink-0">
                <img
                  src={conversation.avatar || "/default-avatar.png"}
                  alt={conversation.name}
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {conversation.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread && (
                <div className="w-3 h-3 bg-farmer-primary rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center space-x-4">
                <img
                  src={activeConversation.avatar || "/default-avatar.png"}
                  alt={activeConversation.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-medium">
                    {activeConversation.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isConnected ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === user.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                        message.senderId === user.id
                          ? "bg-farmer-primary text-white"
                          : "bg-white"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <Input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!messageInput.trim()}>
                  Send
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">
                Select a conversation
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Choose a conversation from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
