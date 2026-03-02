import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import bhoomiEngine from '../services/bhoomiEngine';

export class ChatController {
  /**
   * Send message to BhoomiEngine - Complete Agriculture Intelligence
   * NO direct service calls allowed
   */
  async sendMessage(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { message } = req.body;
      const userId = req.user!.id;

      // Validate message
      if (!message || typeof message !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Please provide a valid message',
        });
        return;
      }

      // Process through BhoomiEngine (complete intelligence system)
      const bhoomiResponse = await bhoomiEngine.processWebChat(message, userId);

      // Return comprehensive response
      res.status(200).json(bhoomiResponse);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get chat history for authenticated user
   */
  async getChatHistory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { limit = 20 } = req.query;

      // Get chat history through BhoomiEngine
      const history = await bhoomiEngine.getChatHistory(userId, Number(limit));

      res.status(200).json({
        success: true,
        data: {
          chats: history,
          total: history.length,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Health check for BhoomiEngine
   */
  async healthCheck(_req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const health = await bhoomiEngine.healthCheck();

      res.status(200).json({
        success: true,
        data: health,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user analytics from BhoomiEngine
   */
  async getUserAnalytics(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const analytics = await bhoomiEngine.getUserAnalytics(userId);

      res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ChatController();
