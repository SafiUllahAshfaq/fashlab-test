import errorHandler from 'errorhandler';
import { Request, Response } from 'express';

import { app } from './app';
import { env } from './config/env';

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
const server = app.listen(env.get('SERVER_PORT'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    env.get('SERVER_PORT'),
    env.get('NODE_ENV')
  );
  console.log('  Press CTRL-C to stop\n');
});

app.get('/health', (_req: Request, res: Response) => {
  return res.send({
    message: 'Welcome!',
    info: `Server is up and running on ${env.get('SERVER_PORT')}`
  });
});

export default server;
