import {ErrorRequestHandler} from "express";
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from "../../constants/http";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

  let statusCode = err.statusCode || INTERNAL_SERVER_ERROR
  let message = err.message || "Internal Server Error"

  if (err.name === "CastError") {
    statusCode = BAD_REQUEST
    message = `Resource not found. Invalid: ${err.path}`
  }

  if (err.code === 11000) {
    statusCode= BAD_REQUEST
    message = "Duplicated field value entered";
  }

  if (err.name === "ValidationError" && err.errors) {
    const messages = Object.values(err.errors).map((val: any) => val.message);
    statusCode = BAD_REQUEST
    message = messages.join(", ")
  }

  return res.status(statusCode).json({
    success: false,
    error: message
  })
};

export default errorHandler