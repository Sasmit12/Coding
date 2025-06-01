import express from 'express';
import { body, param } from 'express-validator';
import { authenticateUser, requireRole } from '../middleware/auth.js';
import * as payoutController from '../controllers/payoutController.js';

const router = express.Router();

// Validation middleware
const validatePayoutCalculation = [
  body('sessionIds').isArray().notEmpty(),
  body('sessionIds.*').isString(),
  body('taxRate').optional().isFloat({ min: 0, max: 100 }),
  body('platformFeePercentage').optional().isFloat({ min: 0, max: 100 }),
];

// Calculate payout (admin only)
router.post('/calculate',
  authenticateUser,
  requireRole(['admin']),
  validatePayoutCalculation,
  payoutController.calculatePayout
);

// Get payout details
router.get('/:id',
  authenticateUser,
  param('id').isString(),
  payoutController.getPayoutDetails
);

// Process payout (admin only)
router.post('/:id/process',
  authenticateUser,
  requireRole(['admin']),
  param('id').isString(),
  payoutController.processPayout
);

export default router;