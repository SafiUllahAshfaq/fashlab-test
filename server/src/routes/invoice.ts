import { Router } from 'express';
import { create, getAll } from '../controllers/invoice';
// import { login, signup, updateProfile } from '../controllers/user';

export const invoice = Router();

// user.post('/login', login);
invoice.get('/', getAll);
invoice.post('/', create);
// user.patch('/profile', updateProfile);
