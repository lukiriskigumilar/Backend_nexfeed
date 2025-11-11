import sessionServices from "./sessionServices.js";

import { sendErrorResponse, sendSuccessResponse } from "../../helpers/responseHelper.js";
import AppError from "../../helpers/appError.js";


const sessionsActiveController = async (req,res,next) =>{
    const userId = req.user.id;
    const accessToken =req.accessToken;

    try {
        const activeSession = await sessionServices.findSessionActive(userId,accessToken)
        sendSuccessResponse(res,'retrieve data successfully', activeSession,null,200)
    } catch (error) {
        if(error instanceof AppError){
            sendErrorResponse(
                'failed retrieve data',
                [error.message],
                error.statusCode
            )
            next(error);
        }
        
    }
}

const logoutSessionController = async (req,res,next) => {
    const {idSession} = req.params;

    try {
        const logoutResult = await sessionServices.logOutUser(idSession);
        sendSuccessResponse(res,"session was logout",null,null,200)
    } catch (error) {
        if(error instanceof AppError){
            sendErrorResponse(
                res,
                'logout session failed',
                [error.message],
                error.statusCode
            )
        }
        next(error);
    }
}

export default {sessionsActiveController,logoutSessionController}