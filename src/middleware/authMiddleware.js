import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { sendErrorResponse } from '../helpers/responseHelper';
import AppError from '../helpers/appError';

import redisClient from '../config/cache/redisClient';

const authMiddleware = async (req,res,next) => {
    
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken){
        return sendErrorResponse
        (res,'Access token missing', ['Access token is required'], 401);
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const isBlacklisted = await redisClient.get(
            `blacklist_access_token:${accessToken}`
        )
        if (isBlacklisted){
            throw new AppError('Access token is revoked', 401);
        }
        req.user = {
            id: decoded.id,
            username: decoded.username,
            accessToken: accessToken
        }
        next();
    } catch (error) {
        if (error instanceof AppError) {
            return sendErrorResponse(res, error.message, [error.message], error.statusCode);
        }
        return sendErrorResponse(res, 'Invalid token', ['Token is invalid'], 401);
    }
    }


export {authMiddleware};