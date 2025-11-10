import followServices from "./followServices.js";
import { sendErrorResponse, sendSuccessResponse } from "../../helpers/responseHelper.js";
import AppError from "../../helpers/appError.js";

const addFollowController = async (req,res,next) =>{
    const userNow = req.user.id;
    const {username} =  req.params; 
    
    try {
        const follow = await followServices.addFollow(userNow,username);
        sendSuccessResponse(res,'followed successfully', follow, null, 200)
    } catch (error) {
        if(error instanceof AppError){
            return sendErrorResponse(
            res,
            'failed to follow user',
            [error.message],
            error.statusCode
        );
        }
        next(error);
    }
}

const addUnFollowController = async (req,res,next) =>{
    const userNow = req.user.id;
    const {username} =  req.params;

    try {
        const unfollow = await followServices.unFollow(userNow,username);
        sendSuccessResponse(res,'unfollowed successfully', unfollow, null, 200)
    } catch (error) {
        if(error instanceof AppError){
            return sendErrorResponse(
            res,
            'failed to unfollow user',
            [error.message],
            error.statusCode
        );
        }
        next(error);
    }
}

const getFollowingController = async (req,res,next) => {
    const {id} = req.params;

    try {
        const followings = await followServices.getFollowingById(id);
        sendSuccessResponse(res, 'retrieved followings successfully', followings, null, 200);
    } catch (error) {
        if(error instanceof AppError){
            return sendErrorResponse(
            res,
            'failed to retrieve followings',
            [error.message],
            error.statusCode
        );
        }
        next(error);
    }
}

const getFollowersController = async (req,res,next) => {
    const {id} = req.params;

    try {
        const followers = await followServices.getFollowersById(id);
        sendSuccessResponse(res, 'retrieved followers successfully', followers, null, 200);
    } catch (error) {
        if(error instanceof AppError){
            return sendErrorResponse(
            res,
            'failed to retrieve followers',
            [error.message],
            error.statusCode
        );
        }
        next(error);
    }
}

export default {addFollowController, addUnFollowController, getFollowingController, getFollowersController}