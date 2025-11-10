import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

import followControllers from '../modules/follow/followControllers.js';
const followRoutes = express.Router();
followRoutes.get('/followers/:id', authMiddleware, followControllers.getFollowersController);
followRoutes.get('/following/:id', authMiddleware, followControllers.getFollowingController);
followRoutes.post('/:username', authMiddleware, followControllers.addFollowController);
followRoutes.delete('/:username', authMiddleware, followControllers.addUnFollowController);
export default followRoutes; 
