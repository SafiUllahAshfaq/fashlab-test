import { createConnection } from 'typeorm';
import { Pool } from 'pg';
import url from 'url';

import { env } from './env';

export const initPostgres = () =>
  createConnection({
    type: 'postgres',
    url: env.get('DB_URL'),
  });

export const getPostgresPool = () => {
  const params = url.parse(env.get('DB_URL'));
  const auth = params.auth.split(':');

  return new Pool({
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: Number(params.port),
    database: params.pathname.split('/')[1],
  });
};

