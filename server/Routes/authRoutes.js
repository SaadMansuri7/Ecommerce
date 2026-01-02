import { Router } from 'express';
import { login, register, profile } from '../Controllers/authController.js';
export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);