
const sendSuccessResponse = (res, message ,data = [], pagination = null, statusCode = 200,) => {
    const responseData = {
        success: true,
        message,
        data
    }
    if (pagination) {
        responseData.pagination = pagination;
    }
    return res.status(statusCode).json(responseData);
};

const sendErrorResponse = (res, message,  errors = [], statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors
    });
};

export { sendSuccessResponse, sendErrorResponse };