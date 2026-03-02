import { Router } from 'express';
import productController from '../controllers/productController';
import { authenticate, authorize } from '../middleware/auth';
import { validate, validateParams, validateQuery } from '../middleware/validator';
import { createProductSchema, uuidSchema, paginationSchema } from '../utils/validation';

const router = Router();

// GET /api/products
router.get(
  '/',
  validateQuery(paginationSchema),
  productController.getAllProducts
);

// GET /api/products/:id
router.get(
  '/:id',
  validateParams(uuidSchema.transform((id) => ({ id }))),
  productController.getProductById
);

// POST /api/products (admin only)
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validate(createProductSchema),
  productController.createProduct
);

export default router;
