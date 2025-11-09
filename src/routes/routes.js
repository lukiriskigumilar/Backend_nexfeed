import express from 'express';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const routes= express.Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);

export default routes;

