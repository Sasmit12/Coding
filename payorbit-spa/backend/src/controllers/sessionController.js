import { collections, createDocument, queryDocuments, createAuditLog } from '../services/db.js';

// Create a new session
export const createSession = async (req, res) => {
  try {
    const { mentorId, date, sessionType, duration, ratePerHour } = req.body;
    
    // Calculate session amount (ensure numeric input)
    const amount = Number(duration) * Number(ratePerHour);

    const session = await createDocument(collections.SESSIONS, {
      mentorId,
      date: new Date(date),
      sessionType,
      duration,
      ratePerHour,
      amount,
      status: 'pending', // pending, approved, paid
      createdBy: req.user.uid,
    });

    // Audit log for session creation
    await createAuditLog(
      'session_created',
      req.user.uid,
      { sessionId: session.id, mentorId, amount }
    );

    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
};

// Get sessions with filters and role-based access
export const getSessions = async (req, res) => {
  try {
    const { mentorId, startDate, endDate, sessionType } = req.query;
    const queries = [];

    // Filter by mentor
    if (mentorId) {
      queries.push({ field: 'mentorId', operator: '==', value: mentorId });
    }

    // Filter by date range
    if (startDate) {
      const d = new Date(startDate);
      if (!isNaN(d)) {
        queries.push({ field: 'date', operator: '>=', value: d });
      }
    }
    if (endDate) {
      const d = new Date(endDate);
      if (!isNaN(d)) {
        queries.push({ field: 'date', operator: '<=', value: d });
      }
    }

    // Filter by session type
    if (sessionType) {
      queries.push({ field: 'sessionType', operator: '==', value: sessionType });
    }

    // Role-based filtering (mentors only see their sessions)
    if (req.user.role === 'mentor') {
      queries.push({ field: 'mentorId', operator: '==', value: req.user.uid });
    }

    const sessions = await queryDocuments(collections.SESSIONS, queries);

    // Audit log for session retrieval
    await createAuditLog(
      'sessions_retrieved',
      req.user.uid,
      { filters: req.query }
    );

    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};