import express from 'express';
import { query } from 'express-validator';
import { authenticateUser, requireRole } from '../middleware/auth.js';
import * as auditController from '../controllers/auditController.js';

const router = express.Router();

// Validation middleware for query params
const validateQueryParams = [
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601(),
  query('action').optional().isString(),
  query('userId').optional().isString(),
];

// Routes
router.get('/',
  authenticateUser,
  requireRole(['admin']),
  validateQueryParams,
  auditController.getAuditLogs
);

export default router;