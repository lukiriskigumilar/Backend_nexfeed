import  express  from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { bodyValidator } from "../validators/bodyValidator.js";
import { createFeedSchema } from "../validators/feed/feedValidation.js";
import feedControllers from "../modules/feed/feedControllers.js";

const feedRoutes = express.Router();

feedRoutes.post('',authMiddleware,bodyValidator(createFeedSchema), feedControllers.createFeedController );
feedRoutes.get('/timeline', authMiddleware, feedControllers.getMainFeedsController)
feedRoutes.get('/:id',authMiddleware,feedControllers.getFeedByIdController)


export default feedRoutes
