import {
  collections,
  createDocument,
  getDocument,
  updateDocument,
  createAuditLog
} from '../services/db.js';

export const calculatePayout = async (req, res) => {
  try {
    const {
      sessionIds,
      taxRate = 20,
      platformFeePercentage = 10
    } = req.body;

    // Fetch all sessions
    const sessions = await Promise.all(
      sessionIds.map(id => getDocument(collections.SESSIONS, id))
    );

    // Validate all sessions exist and belong to the same mentor
    if (sessions.some(s => !s)) {
      return res.status(400).json({ error: 'One or more sessions not found' });
    }

    const mentorId = sessions[0].mentorId;
    if (sessions.some(s => s.mentorId !== mentorId)) {
      return res.status(400).json({ error: 'All sessions must belong to the same mentor' });
    }

    // Calculate totals
    const subtotal = sessions.reduce((sum, session) => sum + session.amount, 0);
    const platformFee = (subtotal * platformFeePercentage) / 100;
    const taxAmount = ((subtotal - platformFee) * taxRate) / 100;
    const totalAmount = subtotal - platformFee - taxAmount;

    // Create payout record
    const payout = await createDocument(collections.PAYOUTS, {
      mentorId,
      sessionIds,
      subtotal,
      platformFee,
      platformFeePercentage,
      taxRate,
      taxAmount,
      totalAmount,
      status: 'calculated',
      calculatedAt: new Date(),
      calculatedBy: req.user.uid,
    });

    // Create audit log
    await createAuditLog(
      'payout_calculated',
      req.user.uid,
      {
        payoutId: payout.id,
        mentorId,
        totalAmount,
        sessionCount: sessionIds.length
      }
    );

    res.status(201).json(payout);
  } catch (error) {
    console.error('Error calculating payout:', error);
    res.status(500).json({ error: 'Failed to calculate payout' });
  }
};

export const getPayoutDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const payout = await getDocument(collections.PAYOUTS, id);

    if (!payout) {
      return res.status(404).json({ error: 'Payout not found' });
    }

    // Check authorization
    if (req.user.role === 'mentor' && payout.mentorId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized access to payout' });
    }

    // Fetch related sessions
    const sessions = await Promise.all(
      payout.sessionIds.map(id => getDocument(collections.SESSIONS, id))
    );

    const payoutWithSessions = {
      ...payout,
      sessions: sessions.filter(Boolean),
    };

    // Create audit log
    await createAuditLog(
      'payout_details_viewed',
      req.user.uid,
      { payoutId: id }
    );

    res.json(payoutWithSessions);
  } catch (error) {
    console.error('Error fetching payout details:', error);
    res.status(500).json({ error: 'Failed to fetch payout details' });
  }
};

export const processPayout = async (req, res) => {
  try {
    const { id } = req.params;
    const payout = await getDocument(collections.PAYOUTS, id);

    if (!payout) {
      return res.status(404).json({ error: 'Payout not found' });
    }

    if (payout.status === 'processed') {
      return res.status(400).json({ error: 'Payout already processed' });
    }

    // Update payout status
    const updatedPayout = await updateDocument(collections.PAYOUTS, id, {
      status: 'processed',
      processedAt: new Date(),
      processedBy: req.user.uid,
    });

    // Update session statuses
    await Promise.all(
      payout.sessionIds.map(sessionId =>
        updateDocument(collections.SESSIONS, sessionId, {
          status: 'paid',
          paidAt: new Date(),
          payoutId: id,
        })
      )
    );

    // Create audit log
    await createAuditLog(
      'payout_processed',
      req.user.uid,
      {
        payoutId: id,
        mentorId: payout.mentorId,
        totalAmount: payout.totalAmount
      }
    );

    res.json(updatedPayout);
  } catch (error) {
    console.error('Error processing payout:', error);
    res.status(500).json({ error: 'Failed to process payout' });
  }
};