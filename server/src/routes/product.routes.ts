import { Router } from "express"
import {createProduct, deleteProduct, getProducts, getProductsFromExcel} from "../controllers/product.controller";
import authorize, {protect} from "../middleware/auth.middleware";

const productRouter = Router()

productRouter.get("/", authorize, protect(["shop_owner"]), getProducts)

productRouter.get("/:id", (req, res) => res.send({message: "GET product details"}))

productRouter.post("/", authorize, protect(["shop_owner"]), createProduct)

productRouter.put("/:id", (req, res) => res.send({ message: "UPDATE product" }))

productRouter.delete("/:id", authorize, protect(["shop_owner"]), deleteProduct)

productRouter.get("/rebase", getProductsFromExcel)

export default productRouter
