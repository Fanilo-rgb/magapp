import { Router } from "express"
import {
  createProduct,
  deleteProduct,
  getProduct,
  getShopProducts,
  rebaseProduct,
  updateProduct,
  updateShopProduct
} from "./product.controller";
import authorize, {protect} from "../../shared/middleware/auth.middleware";

const productRouter = Router()

productRouter.get("/rebase", authorize, protect(["admin"]), rebaseProduct)

productRouter.get("/", authorize, protect(["shop_owner"]), getShopProducts)
productRouter.get("/:id", authorize, protect(["shop_owner"]),getProduct)

productRouter.post("/", authorize, protect(["admin"]), createProduct)

productRouter.put("/:shopId/:id", authorize, protect(["shop_owner"]), updateShopProduct)
productRouter.put("/:id", authorize, protect(["admin"]),updateProduct)

productRouter.delete("/:id", authorize, protect(["admin"]), deleteProduct)

export default productRouter
