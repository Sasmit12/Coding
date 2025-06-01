import express from 'express';
import { body, param } from 'express-validator';
import { authenticateUser } from '../middleware/auth.js';
import * as chatController from '../controllers/chatController.js';

const router = express.Router();

// Validation middleware
const validateMessage = [
  body('content').notEmpty().isString(),
  body('recipientId').notEmpty().isString(),
];

// Send a message
router.post('/message',
  authenticateUser,
  validateMessage,
  chatController.sendMessage
);

// Get chat history for a thread
router.get('/history/:threadId',
  authenticateUser,
  param('threadId').isString(),
  chatController.getChatHistory
);

// Get all threads for the authenticated user
router.get('/threads',
  authenticateUser,
  chatController.getUserThreads
);

export default router;