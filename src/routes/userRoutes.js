import express from "express";

import userControllers from "../modules/user/userControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.get('/search', authMiddleware, userControllers.searchUsername);
userRoutes.get('/:id', authMiddleware, userControllers.getUserByIdController);

export default userRoutes;