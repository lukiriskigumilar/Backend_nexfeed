import authServices from "./authServices.js";
import { sendSuccessResponse, sendErrorResponse } from "../../helpers/responseHelper.js";


const registerUserController = async (req,res) => {
    try {
        const data = req.body; 
        const user = await authServices.registerUser(data);
        sendSuccessResponse(res, 'register successfully' [user], 200)
    } catch (error) {
        sendErrorResponse(
            res,
            'register failed',
        error.message,error.statusCode

        )
    }
}

export default {registerUserController}