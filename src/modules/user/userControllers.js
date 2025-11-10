import userService from './userServices.js'
import { sendErrorResponse,sendSuccessResponse } from '../../helpers/responseHelper.js'
import AppError from '../../helpers/appError.js'

const getUserByIdController = async (req,res, next) => {
    const {id} = req.params
    const userNow = req.user.id;
    try {
        const user = await userService.getById(id,userNow);
        sendSuccessResponse(res, 'retrieved data successfully', user, null, 200);
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
    const userNow = req.user.id;
    try {
       const data = await userService.searchByUsername(username,userNow);
        return sendSuccessResponse(
            res,"search successfully", [data],null, 200
        )
        
    } catch (error) {
        next(error);
    }
}

const currentUserController = async (req,res,next) =>{
    const userNow = req.user.id;

    try {
        const user = await userService.currentUser(userNow);
        sendSuccessResponse(res,'get data successfully', user,null,200 )
    } catch (error) {
        next(error)
    }
}

export default {getUserByIdController, searchUsername,currentUserController}