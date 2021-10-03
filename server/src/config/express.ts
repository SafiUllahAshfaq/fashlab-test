import express from 'express';
import compression from 'compression'; // compresses requests
import cors from 'cors';

import { v1 } from '../routes/index';

// Create Express server
const app = express();

export const initExpress = () => {
  // Express configuration
  app.set('port', process.env.PORT || 3002);
  app.use(cors());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Register routes
  app.use('/v1', v1);

  return app;
};
