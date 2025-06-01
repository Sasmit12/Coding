import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, DollarSign, User, Calendar, Calculator, Receipt } from 'lucide-react';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';

export default function Payouts() {
  const [isCalculateModalOpen, setIsCalculateModalOpen] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { toast } = useToast();

  const { data: payouts = [], isLoading } = useQuery({
    queryKey: ['/api/payouts'],
  });

  const { data: mentors = [] } = useQuery({
    queryKey: ['/api/mentors'],
  });

  const { data: sessions = [] } = useQuery({
    queryKey: ['/api/sessions'],
  });

  const calculatePayoutMutation = useMutation({
    mutationFn: (data) => api.payouts.calculate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/payouts'] });
      toast({
        title: 'Payout calculated',
        description: 'The payout has been successfully calculated.',
      });
      setIsCalculateModalOpen(false);
      setSelectedSessions([]);
      setSelectedMentor('');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to calculate payout. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => api.payouts.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/payouts'] });
      toast({
        title: 'Status updated',
        description: 'The payout status has been updated.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update status. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const generateReceiptMutation = useMutation({
    mutationFn: (payoutId) => api.receipts.generate(payoutId),
    onSuccess: () => {
      toast({
        title: 'Receipt generated',
        description: 'The receipt has been successfully generated.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to generate receipt. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-success/10 text-success border-success/20';
      case 'processing':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleCalculatePayout = () => {
    if (!selectedMentor || selectedSessions.length === 0) {
      toast({
        title: 'Invalid selection',
        description: 'Please select a mentor and at least one session.',
        variant: 'destructive',
      });
      return;
    }
    calculatePayoutMutation.mutate({
      sessionIds: selectedSessions,
      mentorId: selectedMentor,
    });
  };

  const completedSessions = sessions.filter(
    (session) => session.status === 'completed' && (!selectedMentor || session.mentorId === selectedMentor)
  );

  const filteredPayouts = payouts.filter((payout) => {
    const mentor = mentors.find((m) => m.id === payout.mentorId);
    const mentorName = mentor?.name || '';
    return (
      mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading payouts...</p>
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
            <h2 className="text-xl font-medium text-foreground">Payouts</h2>
            <p className="text-sm text-muted-foreground">Calculate and manage mentor payouts</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search payouts..."
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
            <Button onClick={() => setIsCalculateModalOpen(true)} className="bg-primary hover:bg-primary/90">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Payout
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {filteredPayouts.length === 0 ? (
          <Card className="shadow-material">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <DollarSign className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No payouts found</h3>
              <p className="text-muted-foreground text-center mb-6">
                {searchTerm ? 'No payouts match your search criteria.' : 'Calculate your first payout from completed sessions.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsCalculateModalOpen(true)} className="bg-primary hover:bg-primary/90">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate First Payout
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-material">
            <CardHeader>
              <h3 className="text-lg font-medium">All Payouts ({filteredPayouts.length})</h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Mentor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Sessions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Gross Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Net Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {filteredPayouts.map((payout) => {
                      const mentor = mentors.find((m) => m.id === payout.mentorId);
                      return (
                        <tr key={payout.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-foreground">
                                  {mentor?.name || 'Unknown Mentor'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {mentor?.specialization || 'N/A'}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                              {new Date(payout.period.startDate).toLocaleDateString()} - {new Date(payout.period.endDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                            {payout.sessionIds.length} sessions
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                            ${payout.grossAmount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                            ${payout.netAmount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Select
                              value={payout.status}
                              onValueChange={(status) => updateStatusMutation.mutate({ id: payout.id, status })}
                              disabled={updateStatusMutation.isPending}
                            >
                              <SelectTrigger className="w-32">
                                <Badge variant="outline" className={getStatusColor(payout.status)}>
                                  {payout.status}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateReceiptMutation.mutate(payout.id)}
                              disabled={generateReceiptMutation.isPending}
                            >
                              <Receipt className="w-4 h-4 mr-1" />
                              Receipt
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Calculate Payout Modal */}
      <Dialog open={isCalculateModalOpen} onOpenChange={setIsCalculateModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Calculate New Payout</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label htmlFor="mentor-select">Select Mentor</Label>
              <Select value={selectedMentor} onValueChange={setSelectedMentor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a mentor..." />
                </SelectTrigger>
                <SelectContent>
                  {mentors.map((mentor) => (
                    <SelectItem key={mentor.id} value={mentor.id}>
                      {mentor.name} - {mentor.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedMentor && (
              <div>
                <Label>Select Completed Sessions</Label>
                <div className="mt-2 max-h-60 overflow-y-auto border border-border rounded-lg">
                  {completedSessions.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No completed sessions available for this mentor.
                    </div>
                  ) : (
                    <div className="p-4 space-y-3">
                      {completedSessions.map((session) => (
                        <div key={session.id} className="flex items-center space-x-3 p-2 hover:bg-muted/30 rounded">
                          <Checkbox
                            id={session.id}
                            checked={selectedSessions.includes(session.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSessions([...selectedSessions, session.id]);
                              } else {
                                setSelectedSessions(selectedSessions.filter(id => id !== session.id));
                              }
                            }}
                          />
                          <label htmlFor={session.id} className="flex-1 cursor-pointer">
                            <div className="text-sm font-medium">
                              {session.sessionType} - {new Date(session.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {session.duration}h × ${session.hourlyRate}/hr = {(session.duration * session.hourlyRate).toFixed(2)}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCalculateModalOpen(false)}
                className="flex-1"
                disabled={calculatePayoutMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCalculatePayout}
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={calculatePayoutMutation.isPending || !selectedMentor || selectedSessions.length === 0}
              >
                {calculatePayoutMutation.isPending ? 'Calculating...' : 'Calculate Payout'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}