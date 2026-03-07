import serverlessHttp from 'serverless-http';
import app from './src/app';

// Wrap Express app for Lambda
export const handler = serverlessHttp(app);
