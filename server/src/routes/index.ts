import { Router } from 'express';

import { invoice } from './invoice';

export const v1 = Router();

v1.use('/invoice', invoice);