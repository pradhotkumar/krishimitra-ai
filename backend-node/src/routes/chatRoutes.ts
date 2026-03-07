import { Router } from 'express';
import chatController from '../controllers/chatController';
import { authenticate } from '../middleware/auth';
import { validate, validateQuery } from '../middleware/validator';
import { chatMessageSchema, paginationSchema } from '../utils/validation';
import { chatLimiter } from '../middleware/rateLimiter';

const router = Router();

// Health check endpoint (no auth required)
router.get('/health', chatController.healthCheck);

// Public chat endpoint (no auth required)
router.post(
  '/public',
  chatLimiter,
  validate(chatMessageSchema),
  chatController.sendPublicMessage
);

// All other chat routes require authentication
router.use(authenticate);

// POST /api/chat - Send message to BhoomiEngine
router.post(
  '/',
  chatLimiter,
  validate(chatMessageSchema),
  chatController.sendMessage
);

// GET /api/chat/history - Get chat history
router.get(
  '/history',
  validateQuery(paginationSchema),
  chatController.getChatHistory
);

// GET /api/chat/analytics - Get user analytics
router.get(
  '/analytics',
  chatController.getUserAnalytics
);

export default router;
