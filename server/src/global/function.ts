
export interface CustomError extends Error {
  statusCode?: number
}

export const createError = (message: string, statusCode: number) => {
  const error: CustomError = new Error(message)
  error.statusCode = statusCode
  return error
}