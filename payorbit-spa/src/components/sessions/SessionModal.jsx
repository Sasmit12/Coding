import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function SessionModal({ isOpen, onClose, onSessionCreated }) {
  const [formData, setFormData] = useState({
    mentorId: "",
    sessionType: "",
    date: "",
    duration: "",
  });

  const { toast } = useToast();

  const { data: mentors = [] } = useQuery({
    queryKey: ["/api/mentors"],
    enabled: isOpen,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.sessions.create({
        mentorId: formData.mentorId,
        sessionType: formData.sessionType,
        date: new Date(formData.date),
        duration: parseFloat(formData.duration),
        hourlyRate: 75, // This would come from mentor's rate
      });

      toast({
        title: "Session created",
        description: "The session has been successfully created.",
      });

      onSessionCreated();
      onClose();
      setFormData({ mentorId: "", sessionType: "", date: "", duration: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create session. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="mentor-select">Mentor</Label>
            <Select
              value={formData.mentorId}
              onValueChange={(value) =>
                setFormData({ ...formData, mentorId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a mentor..." />
              </SelectTrigger>
              <SelectContent>
                {mentors.map((mentor) => (
                  <SelectItem key={mentor.id} value={mentor.id}>
                    {mentor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="session-type">Session Type</Label>
            <Select
              value={formData.sessionType}
              onValueChange={(value) =>
                setFormData({ ...formData, sessionType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1on1">1-on-1 Coaching</SelectItem>
                <SelectItem value="group">Group Workshop</SelectItem>
                <SelectItem value="review">Career Review</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="session-date">Date</Label>
            <Input
              id="session-date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration (hours)</Label>
            <Input
              id="duration"
              type="number"
              step="0.25"
              min="0.25"
              placeholder="2.5"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Add Session
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}