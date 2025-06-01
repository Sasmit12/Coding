import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, User, MessageSquare, Plus } from 'lucide-react';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';

export default function Chat() {
  const [selectedThread, setSelectedThread] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('');

  const { toast } = useToast();

  const { data: mentors = [] } = useQuery({
    queryKey: ['/api/mentors'],
  });

  const { data: messages = [] } = useQuery({
    queryKey: ['/api/chat/history', selectedThread],
    enabled: !!selectedThread,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (data) => api.chat.sendMessage(data.threadId, data.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/history', selectedThread] });
      setNewMessage('');
      toast({
        title: 'Message sent',
        description: 'Your message has been sent successfully.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedThread) return;

    sendMessageMutation.mutate({
      threadId: selectedThread,
      message: newMessage.trim(),
    });
  };

  const startNewThread = () => {
    if (!selectedMentor) {
      toast({
        title: 'Select mentor',
        description: 'Please select a mentor to start a conversation.',
        variant: 'destructive',
      });
      return;
    }
    const threadId = `admin-${selectedMentor}-${Date.now()}`;
    setSelectedThread(threadId);
    setSelectedMentor('');
  };

  const threadOptions = mentors.map((mentor) => ({
    id: `admin-${mentor.id}`,
    label: `Chat with ${mentor.name}`,
    mentorId: mentor.id,
  }));

  return (
    <>
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-foreground">Messages</h2>
            <p className="text-sm text-muted-foreground">Communicate with mentors</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedMentor} onValueChange={setSelectedMentor}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select mentor..." />
              </SelectTrigger>
              <SelectContent>
                {mentors.map((mentor) => (
                  <SelectItem key={mentor.id} value={mentor.id}>
                    {mentor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={startNewThread}
              disabled={!selectedMentor}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Chat List */}
          <div className="w-80 border-r border-border bg-card">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium text-foreground">Conversations</h3>
            </div>
            <div className="overflow-y-auto">
              {threadOptions.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No mentors available
                </div>
              ) : (
                threadOptions.map((thread) => (
                  <div
                    key={thread.id}
                    className={`p-4 border-b border-border cursor-pointer hover:bg-muted/30 transition-colors ${
                      selectedThread === thread.id ? 'bg-primary/10 border-r-2 border-r-primary' : ''
                    }`}
                    onClick={() => setSelectedThread(thread.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {thread.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Click to start conversation
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedThread ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border bg-card">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {threadOptions.find(t => t.id === selectedThread)?.label || 'Chat'}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Online
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderType === 'admin'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderType === 'admin' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {new Date(message.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card">
                  <div className="flex space-x-3">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 min-h-[80px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      disabled={!newMessage.trim() || sendMessageMutation.isPending}
                      className="bg-primary hover:bg-primary/90 self-end"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-muted/10">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a mentor from the list to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}