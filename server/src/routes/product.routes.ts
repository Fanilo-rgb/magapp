import { Router } from "express"
import {getProductsFromExcel} from "../controllers/product.controller";

const productRouter = Router()

productRouter.get("/rebase", getProductsFromExcel)

export default productRouter