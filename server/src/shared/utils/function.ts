
export interface CustomError extends Error {
  statusCode?: number
}

type createErrorType = (message: string, statusCode: number) => CustomError

export const createError: createErrorType = (message, statusCode) => {
  const error: CustomError = new Error(message)
  error.statusCode = statusCode
  return error
}