import { Router } from "express"
import authorize, {protect} from "../../shared/middleware/auth.middleware";
import {getSales} from "./sale.controller";

const saleRouter = Router()

saleRouter.get("/", authorize, protect(["shop_owner"]), getSales)

export default saleRouter