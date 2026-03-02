import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../types';
import { query } from '../config/database';
import { AppError } from '../middleware/errorHandler';

export class ProductController {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, category } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      let queryText = `
        SELECT id, name, description, price, image_url, category, created_at 
        FROM products 
      `;
      const params: any[] = [limit, offset];

      if (category) {
        queryText += ' WHERE category = $3';
        params.push(category);
      }

      queryText += ' ORDER BY created_at DESC LIMIT $1 OFFSET $2';

      const result = await query(queryText, params);

      // Get total count
      const countQuery = category
        ? 'SELECT COUNT(*) FROM products WHERE category = $1'
        : 'SELECT COUNT(*) FROM products';
      const countParams = category ? [category] : [];
      const countResult = await query(countQuery, countParams);
      const total = parseInt(countResult.rows[0].count, 10);

      res.status(200).json({
        success: true,
        data: {
          products: result.rows,
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

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await query(
        'SELECT id, name, description, price, image_url, category, created_at FROM products WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        throw new AppError(404, 'Product not found');
      }

      res.status(200).json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { name, description, price, image_url, category } = req.body;

      const result = await query(
        `INSERT INTO products (id, name, description, price, image_url, category, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
         RETURNING id, name, description, price, image_url, category, created_at`,
        [uuidv4(), name, description, price, image_url, category]
      );

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
