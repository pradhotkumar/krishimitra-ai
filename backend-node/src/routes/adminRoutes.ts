import { Router, Response, NextFunction } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { AuthRequest } from '../types';
import { query } from '../config/database';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate, authorize('admin'));

// GET /api/admin/dashboard
router.get('/dashboard', async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get dashboard statistics
    const [usersCount, productsCount, ordersCount, chatsCount] = await Promise.all([
      query('SELECT COUNT(*) FROM users'),
      query('SELECT COUNT(*) FROM products'),
      query('SELECT COUNT(*) FROM orders'),
      query('SELECT COUNT(*) FROM chat_logs'),
    ]);

    // Get recent orders
    const recentOrders = await query(
      `SELECT o.id, o.quantity, o.status, o.created_at,
              u.email as user_email,
              p.name as product_name
       FROM orders o
       JOIN users u ON o.user_id = u.id
       JOIN products p ON o.product_id = p.id
       ORDER BY o.created_at DESC
       LIMIT 10`
    );

    res.status(200).json({
      success: true,
      data: {
        statistics: {
          totalUsers: parseInt(usersCount.rows[0].count, 10),
          totalProducts: parseInt(productsCount.rows[0].count, 10),
          totalOrders: parseInt(ordersCount.rows[0].count, 10),
          totalChats: parseInt(chatsCount.rows[0].count, 10),
        },
        recentOrders: recentOrders.rows,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
