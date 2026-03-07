import serverless from 'serverless-http';
import app from './src/app';

const server = serverless(app);

export const handler = async (event: any, context: any) => {

  // Fix API Gateway stage prefix
  if (event.rawPath) {
    event.rawPath = event.rawPath.replace(/^\/prod/, '');
  }

  if (event.path) {
    event.path = event.path.replace(/^\/prod/, '');
  }

  if (event.requestContext?.http?.path) {
    event.requestContext.http.path =
      event.requestContext.http.path.replace(/^\/prod/, '');
  }

  return server(event, context);
};
