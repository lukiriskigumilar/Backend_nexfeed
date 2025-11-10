import express from 'express';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import followRoutes from './followRoutes.js';

const routes= express.Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/follow', followRoutes);


export default routes;

