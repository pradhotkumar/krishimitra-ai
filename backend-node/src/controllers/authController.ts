import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';
import { AppError } from '../middleware/errorHandler';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;

      const result = await authService.register(email, password, role);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'User already exists') {
        next(new AppError(409, 'User already exists'));
      } else {
        next(error);
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        next(new AppError(401, 'Invalid email or password'));
      } else {
        next(error);
      }
    }
  }
}

export default new AuthController();
