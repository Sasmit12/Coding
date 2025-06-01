import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter, User, Mail, Phone, DollarSign } from 'lucide-react';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';

export default function Mentors() {
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    hourlyRate: '',
    status: 'active',
  });

  const { toast } = useToast();

  const { data: mentors = [], isLoading } = useQuery({
    queryKey: ['/api/mentors'],
  });

  const createMentorMutation = useMutation({
    mutationFn: (mentorData) => api.mentors.create(mentorData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/mentors'] });
      toast({
        title: 'Mentor created',
        description: 'The mentor has been successfully created.',
      });
      setIsMentorModalOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        hourlyRate: '',
        status: 'active',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create mentor. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMentorMutation.mutate({
      ...formData,
      hourlyRate: parseFloat(formData.hourlyRate),
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'inactive':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'suspended':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading mentors...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-foreground">Mentors</h2>
            <p className="text-sm text-muted-foreground">Manage mentor profiles and rates</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search mentors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => setIsMentorModalOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Mentor
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {filteredMentors.length === 0 && !isLoading ? (
          <Card className="shadow-material">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <User className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No mentors found</h3>
              <p className="text-muted-foreground text-center mb-6">
                {searchTerm ? 'No mentors match your search criteria.' : 'Get started by adding your first mentor.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsMentorModalOpen(true)} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Mentor
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="shadow-material hover:shadow-material-lg transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground">{mentor.specialization}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(mentor.status)}>
                      {mentor.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{mentor.email}</span>
                  </div>
                  {mentor.phone && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{mentor.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">${mentor.hourlyRate}/hour</span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Mentor Modal */}
      <Dialog open={isMentorModalOpen} onOpenChange={setIsMentorModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Mentor</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                placeholder="e.g., Software Engineering, Data Science"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                step="0.01"
                min="1"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsMentorModalOpen(false)} 
                className="flex-1"
                disabled={createMentorMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={createMentorMutation.isPending}
              >
                {createMentorMutation.isPending ? 'Creating...' : 'Add Mentor'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}