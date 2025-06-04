import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, User } from 'lucide-react';
import { SessionModal } from '@/components/sessions/SessionModal';
import { useAuth } from '@/hooks/useAuth';

export default function Sessions() {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth(); // for mentorId

  // Only fetch sessions for this mentor if a mentor
  const { data: sessions = [], refetch } = useQuery({
    queryKey: ['/api/sessions', user?.role === "mentor" ? user.mentorId : undefined],
    queryFn: async () => {
      if (user?.role === "mentor") {
        // Only mentor's sessions
        return await fetch(`/api/sessions?mentorId=${user.mentorId}`).then(r => r.json());
      }
      // Otherwise all sessions (admin)
      return await fetch(`/api/sessions`).then(r => r.json());
    },
    enabled: !!user,
  });

  const { data: mentees = [] } = useQuery({
    queryKey: ['/api/mentees'],
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'upcoming':
      case 'scheduled':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'missed':
      case 'no-show':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredSessions = sessions.filter((session) => {
    const menteeName = session.mentee || (mentees.find((m) => m.id === session.menteeId)?.name ?? "");
    return (
      menteeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (session.status || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <header className="bg-card shadow-sm border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-foreground">My Sessions</h2>
            <p className="text-sm text-muted-foreground">View your upcoming and previous mentoring sessions.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search sessions..."
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
            <Button onClick={() => setIsSessionModalOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Schedule New Session
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <Card className="shadow-material">
          <CardHeader>
            <h3 className="text-lg font-medium">All Sessions ({filteredSessions.length})</h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Session Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Mentee
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
                  {filteredSessions.map((session, i) => (
                    <tr key={session.id || i}>
                      <td className="px-6 py-4 whitespace-nowrap">{session.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{session.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="ml-3">{session.mentee || (mentees.find((m) => m.id === session.menteeId)?.name ?? "")}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button variant="outline" size="sm">
                          {session.action || (session.status === "Upcoming" ? "View" : session.status === "Completed" ? "Details" : "Reschedule")}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <SessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        onSessionCreated={() => refetch()}
      />
    </>
  );
}