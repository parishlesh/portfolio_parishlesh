const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend Error";
    const extraDetails = err.extraDetails || "Error From Backend"

    const response= res.status(status).json({status, message, extraDetails })

   return response;
}

module.exports = errorMiddleware;