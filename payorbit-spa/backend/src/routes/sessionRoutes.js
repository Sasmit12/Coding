import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { authenticateUser, requireRole } from '../middleware/auth.js';
import * as sessionController from '../controllers/sessionController.js';

const router = express.Router();

// Validation middleware for session creation
const validateSession = [
  body('mentorId').notEmpty().isString(),
  body('date').notEmpty().isISO8601(),
  body('sessionType').notEmpty().isIn(['one-on-one', 'group', 'workshop']),
  body('duration').notEmpty().isFloat({ min: 0.5 }),
  body('ratePerHour').notEmpty().isFloat({ min: 0 }),
];

// Validation middleware for GET query params
const validateQueryParams = [
  query('mentorId').optional().isString(),
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601(),
  query('sessionType').optional().isIn(['one-on-one', 'group', 'workshop']),
];

// Middleware to check validation results
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create session route
router.post('/',
  authenticateUser,
  requireRole(['admin', 'mentor']),
  validateSession,
  checkValidation,
  sessionController.createSession
);

// Get sessions route
router.get('/',
  authenticateUser,
  validateQueryParams,
  checkValidation,
  sessionController.getSessions
);

export default router;