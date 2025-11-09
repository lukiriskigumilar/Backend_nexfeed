import express from 'express';

import { bodyValidator } from '../validators/bodyValidator.js';
import {loginSchema, registerSchema} from '../validators/auth/authValidator.js';

import authControllers from '../modules/auth/authControllers.js';
const authRoutes = express.Router();

authRoutes.post('/register',bodyValidator(registerSchema),authControllers.registerUserController );

authRoutes.post('/login', bodyValidator(loginSchema), authControllers.loginUserController);

export default authRoutes;