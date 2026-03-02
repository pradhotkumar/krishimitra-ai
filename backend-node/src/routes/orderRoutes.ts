import { Router } from 'express';
import orderController from '../controllers/orderController';
import { authenticate } from '../middleware/auth';
import { validate, validateQuery } from '../middleware/validator';
import { createOrderSchema, paginationSchema } from '../utils/validation';

const router = Router();

// All order routes require authentication
router.use(authenticate);

// POST /api/orders
router.post(
  '/',
  validate(createOrderSchema),
  orderController.createOrder
);

// GET /api/orders
router.get(
  '/',
  validateQuery(paginationSchema),
  orderController.getUserOrders
);

export default router;
