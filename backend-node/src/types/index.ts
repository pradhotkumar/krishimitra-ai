import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'farmer' | 'admin';
  };
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'farmer' | 'admin';
  created_at: Date;
}

export interface ChatLog {
  id: string;
  user_id: string;
  message: string;
  ai_response: string;
  created_at: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at: Date;
}

export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
}
