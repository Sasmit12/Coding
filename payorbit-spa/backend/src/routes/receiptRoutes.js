import express from 'express';
import { param } from 'express-validator';
import { authenticateUser, requireRole } from '../middleware/auth.js';
import * as receiptController from '../controllers/receiptController.js';

const router = express.Router();

// Generate a receipt for a payout (admin only)
router.post('/:payoutId',
  authenticateUser,
  requireRole(['admin']),
  param('payoutId').isString(),
  receiptController.generateReceipt
);

// Get all receipts for a mentor
router.get('/:mentorId',
  authenticateUser,
  param('mentorId').isString(),
  receiptController.getMentorReceipts
);

export default router;