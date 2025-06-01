import {
  collections,
  createDocument,
  getDocument,
  queryDocuments,
  createAuditLog
} from '../services/db.js';

// Generate a mentor payout receipt
export const generateReceipt = async (req, res) => {
  try {
    const { payoutId } = req.params;
    const payout = await getDocument(collections.PAYOUTS, payoutId);

    if (!payout) {
      return res.status(404).json({ error: 'Payout not found' });
    }

    if (payout.status !== 'processed') {
      return res.status(400).json({ error: 'Cannot generate receipt for unprocessed payout' });
    }

    // Get mentor details
    const mentor = await getDocument(collections.MENTORS, payout.mentorId);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Get all sessions included in the payout
    const sessions = await Promise.all(
      payout.sessionIds.map(id => getDocument(collections.SESSIONS, id))
    );
    if (sessions.some(session => !session)) {
      return res.status(400).json({ error: 'One or more sessions not found for this payout' });
    }

    // Generate a more unique receipt number
    const receiptNumber = `REC-${payoutId.substring(0, 8)}-${Date.now()}`;

    // Generate receipt data
    const receipt = await createDocument(collections.RECEIPTS, {
      payoutId,
      mentorId: payout.mentorId,
      mentorName: mentor.name,
      mentorEmail: mentor.email,
      receiptNumber,
      issueDate: new Date(),
      sessions: sessions.map(session => ({
        id: session.id,
        date: session.date,
        type: session.sessionType,
        duration: session.duration,
        amount: session.amount,
      })),
      subtotal: payout.subtotal,
      platformFee: payout.platformFee,
      platformFeePercentage: payout.platformFeePercentage,
      taxAmount: payout.taxAmount,
      taxRate: payout.taxRate,
      totalAmount: payout.totalAmount,
      status: 'generated',
      generatedBy: req.user.uid,
    });

    // Create audit log
    await createAuditLog(
      'receipt_generated',
      req.user.uid,
      {
        receiptId: receipt.id,
        payoutId,
        mentorId: payout.mentorId,
        totalAmount: payout.totalAmount
      }
    );

    res.status(201).json(receipt);
  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({ error: 'Failed to generate receipt' });
  }
};

// Get all receipts for a mentor
export const getMentorReceipts = async (req, res) => {
  try {
    const { mentorId } = req.params;

    // Check authorization
    if (req.user.role === 'mentor' && mentorId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized access to receipts' });
    }

    // Query receipts
    const receipts = await queryDocuments(collections.RECEIPTS, [
      { field: 'mentorId', operator: '==', value: mentorId }
    ]);

    // Create audit log
    await createAuditLog(
      'receipts_retrieved',
      req.user.uid,
      { mentorId }
    );

    res.json(receipts);
  } catch (error) {
    console.error('Error fetching mentor receipts:', error);
    res.status(500).json({ error: 'Failed to fetch receipts' });
  }
};