import { Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../types';
import { query } from '../config/database';
import { AppError } from '../middleware/errorHandler';

export class OrderController {
  async createOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { product_id, quantity } = req.body;
      const userId = req.user!.id;

      // Verify product exists
      const productResult = await query(
        'SELECT id, price FROM products WHERE id = $1',
        [product_id]
      );

      if (productResult.rows.length === 0) {
        throw new AppError(404, 'Product not found');
      }

      // Create order
      const result = await query(
        `INSERT INTO orders (id, user_id, product_id, quantity, status, created_at) 
         VALUES ($1, $2, $3, $4, $5, NOW()) 
         RETURNING id, user_id, product_id, quantity, status, created_at`,
        [uuidv4(), userId, product_id, quantity, 'pending']
      );

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { page = 1, limit = 10 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      const result = await query(
        `SELECT o.id, o.product_id, o.quantity, o.status, o.created_at,
                p.name as product_name, p.price as product_price
         FROM orders o
         JOIN products p ON o.product_id = p.id
         WHERE o.user_id = $1
         ORDER BY o.created_at DESC
         LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
      );

      // Get total count
      const countResult = await query(
        'SELECT COUNT(*) FROM orders WHERE user_id = $1',
        [userId]
      );
      const total = parseInt(countResult.rows[0].count, 10);

      res.status(200).json({
        success: true,
        data: {
          orders: result.rows,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
