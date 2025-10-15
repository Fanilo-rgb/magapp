import axios from "axios"
import {FASTAPI_URL} from "../constants/env";
import catchErrors from "../utils/catchErrors";
import {createError} from "../global/function";

const fastapi = axios.create({
  baseURL: FASTAPI_URL,
})

export const getProductsFromExcel = catchErrors(
  async (req, res) => {
    const response = await fastapi.get('/products')

    if (!response) throw createError("No response from FastAPI", 502)

    return res.status(200).send(response.data)
  }
)

