import convict from 'convict';
import dotenv from 'dotenv';

import logger from '../util/logger';

export enum ENVS {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

dotenv.config({ path: './.env' });

export const env = convict({
  NODE_ENV: {
    format: Object.values(ENVS),
    default: ENVS.DEVELOPMENT,
    env: 'NODE_ENV',
  },
  SERVER_URL: {
    format: '*',
    default: 'http://localhost',
    env: 'SERVER_URL',
  },
  SERVER_PORT: {
    format: 'port',
    default: '3002',
    env: 'SERVER_PORT',
  },
  DB_URL: {
    format: String,
    default: 'postgresql://postgres:postgres@localhost/invoice-test',
    env: 'DB_URL',
  },
  FILES_DIR: {
    format: String,
    default: 'uploads',
    env: 'FILES_DIR',
  },
  MIGRATIONS: {
    format: String,
    default: 'src/migrations/**',
    env: 'MIGRATIONS',
  },
  isProd: {
    format: Boolean,
    default: false,
  },
});

env.validate({ allowed: 'strict' });

const prod = env.get('NODE_ENV') === ENVS.PRODUCTION; // Anything else is treated as 'dev'

env.set('isProd', prod);


if (!env.get('DB_URL')) {
  logger.error('Database connection details are incomplete. Please check environment variables.', {
    __filename,
  });
  process.exit(1);
}


logger.info({ message: env.getEnv(), __filename });
