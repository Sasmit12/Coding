"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Shield } from "lucide-react"

const mockChats = [
  {
    id: "1",
    mentorName: "Dr. Sarah Johnson",
    mentorInitials: "SJ",
    lastMessage: "Thank you for the payout clarification!",
    timestamp: "2024-01-15 14:30",
    unreadCount: 0,
    status: "online",
  },
  {
    id: "2",
    mentorName: "Prof. Mike Chen",
    mentorInitials: "MC",
    lastMessage: "When will the January payout be processed?",
    timestamp: "2024-01-15 12:15",
    unreadCount: 2,
    status: "offline",
  },
  {
    id: "3",
    mentorName: "Dr. Emily Davis",
    mentorInitials: "ED",
    lastMessage: "I have a question about the platform fee calculation.",
    timestamp: "2024-01-14 16:45",
    unreadCount: 1,
    status: "online",
  },
]

const mockMessages = [
  {
    id: "1",
    sender: "mentor",
    content: "Hi, I have a question about my January payout calculation.",
    timestamp: "2024-01-15 14:25",
    read: true,
  },
  {
    id: "2",
    sender: "admin",
    content: "Hello! I'd be happy to help you with that. What specific aspect would you like me to clarify?",
    timestamp: "2024-01-15 14:27",
    read: true,
  },
  {
    id: "3",
    sender: "mentor",
    content: "I noticed the platform fee was higher than expected. Could you break down how it's calculated?",
    timestamp: "2024-01-15 14:28",
    read: true,
  },
  {
    id: "4",
    sender: "admin",
    content:
      "Of course! The platform fee is calculated as 15% of your gross earnings. For January, your gross was $925, so the fee was $138.75. This covers payment processing, platform maintenance, and support services.",
    timestamp: "2024-01-15 14:29",
    read: true,
  },
  {
    id: "5",
    sender: "mentor",
    content: "Thank you for the payout clarification!",
    timestamp: "2024-01-15 14:30",
    read: false,
  },
]

export function ChatModule() {
  const [selectedChat, setSelectedChat] = useState("1")
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [chats] = useState(mockChats)

  const selectedChatData = chats.find((chat) => chat.id === selectedChat)

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: (messages.length + 1).toString(),
        sender: "admin",
        content: newMessage,
        timestamp: new Date().toLocaleString(),
        read: false,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Secure Chat
          </CardTitle>
          <CardDescription>End-to-end encrypted communication between admin and mentors</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedChat === chat.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{chat.mentorInitials}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                          chat.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{chat.mentorName}</p>
                        {chat.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-1">{chat.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{chat.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{selectedChatData?.mentorInitials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedChatData?.mentorName}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      selectedChatData?.status === "online" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {selectedChatData?.status}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[400px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "admin" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "admin" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}