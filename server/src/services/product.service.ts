import fastapi from "../utils/fastapi";
import {createError} from "../global/function";

export const getProductFromExcel = async () => {
  const response = await fastapi.get('/products')
  if (!response) throw createError("No response from FastAPI", 502)
  return response.data
}