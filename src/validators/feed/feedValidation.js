import joi from 'joi';


const createFeedSchema = joi.object(
    {
        content: joi.string().max(200).required()
    }
)

export { createFeedSchema }