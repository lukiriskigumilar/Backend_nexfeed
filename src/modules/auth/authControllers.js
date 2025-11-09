import authServices from "./authServices.js";
import { sendSuccessResponse, sendErrorResponse } from "../../helpers/responseHelper.js";


const registerUserController = async (req,res) => {
    try {
        const data = req.body; 
        const user = await authServices.registerUser(data);
        sendSuccessResponse(res, 'register successfully', user,null, 200)
    } catch (error) {
        sendErrorResponse(
            res,
            'register failed',
        [ error.message],
        error.statusCode

        )
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
        sendErrorResponse(
            res,
            'login failed',
            [error.message],
            error.statusCode
        );
        next(error);
    }
}

export default {registerUserController,loginUserController}