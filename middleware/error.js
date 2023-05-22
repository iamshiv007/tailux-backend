const errorHandler = (
    res,
    statusCode = 500,
    message = "Internal Server Error"
) => {
    return res.status(statusCode).json({
        success: false,
        message
    })
}

const asyncError = (passesFunc) => (req, res, next) => {
    return Promise.resolve(passesFunc(req, res, next)).catch((err) => {
        return errorHandler(res, 500, err.message)
    })
}

module.exports = {
    errorHandler,
    asyncError
}