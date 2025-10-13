import axios from "axios"
import {FASTAPI_URL} from "../constants/env";
import {Request, Response} from "express";

const fastapi = axios.create({
  baseURL: FASTAPI_URL,
})

export const getProductsFromExcel = async (req: Request, res: Response) => {
  const response = await fastapi.get('/products')

  if (!response) return res.status(500).send({ success: false, message: 'Error fetching products' })

  return res.status(200).send(response.data)
}

