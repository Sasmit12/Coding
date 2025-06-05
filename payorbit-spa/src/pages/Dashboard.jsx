import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, Plus } from 'lucide-react';
import { StatsCards } from '@/components/StatsCards';
import { RecentSessions } from '@/components/RecentSessions';
import { PayoutOverview } from '@/components/PayoutOverview';
import { QuickActions } from '@/components/QuickActions';
import { SessionModal } from '@/components/SessionModal';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const { toast } = useToast();

  const { data: sessions = [], refetch: refetchSessions } = useQuery({
    queryKey: ['/api/sessions'],
  });

  const { data: payouts = [] } = useQuery({
    queryKey: ['/api/payouts'],
  });

  const { data: mentors = [] } = useQuery({
    queryKey: ['/api/mentors'],
  });

  // Calculate stats from real data
  const stats = {
    totalPayouts: payouts.reduce((sum, payout) => sum + (payout.netAmount || 0), 0),
    activeMentors: mentors.filter((mentor) => mentor.status === 'active').length,
    sessionsCount: sessions.length,
    pendingPayouts: payouts.filter((payout) => payout.status === 'pending').length,
  };

  // Transform sessions data for RecentSessions component
  const recentSessions = sessions.slice(0, 5).map((session) => {
    const mentor = mentors.find((m) => m.id === session.mentorId);
    return {
      id: session.id,
      mentorName: mentor?.name || 'Unknown Mentor',
      mentorId: session.mentorId,
      sessionType: session.sessionType,
      duration: session.duration,
      hourlyRate: session.hourlyRate,
      status: session.status,
    };
  });

  // Calculate payout overview data
  const payoutOverviewData = {
    pending: {
      count: payouts.filter((p) => p.status === 'pending').length,
      amount: payouts.filter((p) => p.status === 'pending').reduce((sum, p) => sum + (p.netAmount || 0), 0),
    },
    processing: {
      count: payouts.filter((p) => p.status === 'processing').length,
      amount: payouts.filter((p) => p.status === 'processing').reduce((sum, p) => sum + (p.netAmount || 0), 0),
    },
    completed: {
      count: payouts.filter((p) => p.status === 'paid').length,
      amount: payouts.filter((p) => p.status === 'paid').reduce((sum, p) => sum + (p.netAmount || 0), 0),
    },
  };

  const handleCalculatePayouts = async () => {
    const completedSessions = sessions.filter((s) => s.status === 'completed');
    if (completedSessions.length === 0) {
      toast({
        title: 'No sessions to process',
        description: 'There are no completed sessions available for payout calculation.',
        variant: 'destructive',
      });
      return;
    }

    // Group sessions by mentor
    const sessionsByMentor = completedSessions.reduce((acc, session) => {
      if (!acc[session.mentorId]) {
        acc[session.mentorId] = [];
      }
      acc[session.mentorId].push(session);
      return acc;
    }, {});

    try {
      for (const [mentorId, mentorSessions] of Object.entries(sessionsByMentor)) {
        await api.payouts.calculate({
          sessionIds: mentorSessions.map((s) => s.id),
          mentorId,
        });
      }

      toast({
        title: 'Payouts calculated',
        description: `Calculated payouts for ${Object.keys(sessionsByMentor).length} mentors.`,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to calculate payouts. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleAddSession = () => {
    setIsSessionModalOpen(true);
  };

  const handleAddMentor = () => {
    toast({
      title: 'Feature coming soon',
      description: 'Mentor management interface will be available soon.',
    });
  };

  const handleGenerateReceipts = () => {
    toast({
      title: 'Feature coming soon',
      description: 'Bulk receipt generation will be available soon.',
    });
  };

  const handleExportData = () => {
    toast({
      title: 'Feature coming soon',
      description: 'Data export functionality will be available soon.',
    });
  };

  return (
    <>
      {/* Top Bar */}
      <header className="bg-card shadow-sm border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-medium text-foreground">Dashboard</h2>
            <nav className="hidden md:flex space-x-4">
              <span className="text-sm text-muted-foreground">Overview</span>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search mentors, sessions..."
                className="w-64 pl-10 pr-4"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Button onClick={handleAddSession} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              New
            </Button>
          </div>
        </div>
      </header>
      {/* Dashboard Content */}
      <div className="flex-1 overflow-auto p-6">
        <StatsCards stats={stats} />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <RecentSessions sessions={recentSessions} />
          <PayoutOverview payouts={payoutOverviewData} onCalculatePayouts={handleCalculatePayouts} />
        </div>
        <QuickActions
          onAddSession={handleAddSession}
          onAddMentor={handleAddMentor}
          onGenerateReceipts={handleGenerateReceipts}
          onExportData={handleExportData}
        />
      </div>
      <SessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        onSessionCreated={() => refetchSessions()}
      />
    </>
  );
}