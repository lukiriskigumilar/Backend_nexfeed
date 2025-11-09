import userService from './userServices.js'
import { sendErrorResponse,sendSuccessResponse } from '../../helpers/responseHelper.js'
import AppError from '../../helpers/appError.js'

const getUserByIdController = async (req,res, next) => {
    const {id} = req.params
    try {
        const user = await userService.getById({id});
        sendSuccessResponse(res, 'retrieved data successfully', [user], null, 200);
    } catch (error) {
        if(error instanceof AppError){
            return sendErrorResponse(
            res,
            'failed retrieved data user',
            [error.message],
            error.statusCode
        );
        }
        next(error);
        
        
    }
}

const searchUsername = async (req,res,next) => {
    const {username} = req.query;
    try {
       const data = await userService.searchByUsername(username);
        return sendSuccessResponse(
            res,"search successfully", [data],null, 200
        )
        
    } catch (error) {
        next(error);
    }
}

export default {getUserByIdController, searchUsername}