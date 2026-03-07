import serverless from 'serverless-http';
import app from './src/app';

const server = serverless(app);

export const handler = async (event: any, context: any) => {
  if (event.path) {
    event.path = event.path.replace(/^\/prod/, '');
  }

  return server(event, context);
};
