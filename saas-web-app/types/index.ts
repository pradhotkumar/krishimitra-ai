// Core data models
export interface Message {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  language: 'hi' | 'en';
  timestamp: Date;
  userId?: string;
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  model?: string;
  tokens?: number;
  latency?: number;
  confidence?: number;
}

export interface Session {
  sessionId: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
  lastActivity: Date;
  messageCount: number;
  language: 'hi' | 'en';
  region?: string;
  status: 'active' | 'completed' | 'abandoned';
}

export interface ContactSubmission {
  messageId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  language: 'hi' | 'en';
  timestamp: Date;
  status: 'pending' | 'reviewed' | 'responded';
}

// API request/response types
export interface ChatRequest {
  message: string;
  language: 'hi' | 'en';
  sessionId?: string;
  userId?: string;
}

export interface ChatResponse {
  response: string;
  sessionId: string;
  timestamp: string;
  language: 'hi' | 'en';
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  language: 'hi' | 'en';
}

export interface ContactResponse {
  success: boolean;
  messageId: string;
}

export interface ErrorResponse {
  error: string;
  code?: string;
  details?: string;
  timestamp: string;
}

// Validation types
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
