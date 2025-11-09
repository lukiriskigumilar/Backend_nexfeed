import authServices from "./authServices.js";
import { sendSuccessResponse, sendErrorResponse } from "../../helpers/responseHelper.js";
import AppError from "../../helpers/appError.js";

const registerUserController = async (req,res,next) => {
    try {
        const data = req.body; 
        const user = await authServices.registerUser(data);
        sendSuccessResponse(res, 'register successfully', user,null, 200)
    } catch (error) {
        if (error instanceof AppError) {
            return sendErrorResponse(res, 'Register failed', [error.message], error.statusCode);
        }
        next(error);
    }
}

const loginUserController = async (req,res,next) => {
    const data = req.body;
    const ua = req.useragent;
    const ipAddress = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
    try {
        const user = await authServices.loginUser(data, ua, ipAddress);
        sendSuccessResponse(res, 'login successfully', user, null, 200);
    } catch (error) {
        if (error instanceof AppError) {
            return sendErrorResponse(res, 'login failed', [error.message], error.statusCode);
        }
        next(error);
       
    }
}

const logOutUserController = async  (req,res,next) => {
    const userId = req.user.id;
    const accessToken = req.user.accessToken;

    try {
       const result = await authServices.logOutUser(userId, accessToken);
        sendSuccessResponse(res, 'logout successfully', null, null, 200);
    } catch (error) {
         if (error instanceof AppError) {
            return sendErrorResponse(res, 'logout failed', null, error.statusCode);
        }
        next(error);
    }
}

const getNewAccessTokenController = async (req,res,next) => {
    const refreshToken = req.body.refresh_token;

    try {
        const result = await authServices.getNewAccessToken(refreshToken);
        sendSuccessResponse(res, 'New access token generated successfully', result, null, 200);
    } catch (error) {
        if (error instanceof AppError) {
            return sendErrorResponse(res, 'Failed to generate new access token', [error.message], error.statusCode);
        }
        next(error);
    }
}

export default {registerUserController,loginUserController,logOutUserController,getNewAccessTokenController}