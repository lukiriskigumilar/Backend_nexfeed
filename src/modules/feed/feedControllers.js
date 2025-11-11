import feedServices from "./feedServices.js";
import { sendErrorResponse,sendSuccessResponse } from "../../helpers/responseHelper.js";
import AppError from "../../helpers/appError.js";

const createFeedController = async(req,res,next) => {
    const userId = req.user.id;
    const {content} = req.body
    
    try {
        const saveFeed = await feedServices.createFeed(userId,content);
        sendSuccessResponse(res,'create post was successfully',saveFeed,null,200)
    } catch (error) {
        next(error);
    }
}


const getFeedByIdController = async(req,res,next) => {
     const {id} = req.params;
    
    try {
        const feedById = await feedServices.getFeedById(id);
        sendSuccessResponse(res,'generate post successfully',feedById,null,200)
    } catch (error) {
        if(error instanceof AppError){
            sendErrorResponse(
                res,
                'generate post failed',
                [error.message],error.statusCode
            )
        }
        next(error);
    }
} 

const getMainFeedsController = async (req,res,next) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        if(page < 1){
            return sendErrorResponse(
                res,
                'page must be at least 1',
                null,400
            )
        }
      const result = await feedServices.getMainFeed(userId,page,limit);
      return sendSuccessResponse(
        res,
        'get feed successfully',
        result.data,result.pagination,200
      )
    } catch (error) {
        next(error)
    }
}

export default {createFeedController,getFeedByIdController,getMainFeedsController}