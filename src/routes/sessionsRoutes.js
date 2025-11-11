import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import sessionControllers from '../modules/sessions/sessionControllers.js';

const sessionsRoutes = express.Router();
sessionsRoutes.get('',authMiddleware, sessionControllers.sessionsActiveController)
sessionsRoutes.post('/logout/:idSession', authMiddleware, sessionControllers.logoutSessionController)

export default sessionsRoutes