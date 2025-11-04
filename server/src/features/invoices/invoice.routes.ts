import { Router } from "express"
import authorize, {protect} from "../../shared/middleware/auth.middleware";
import {createInvoice} from "./invoice.controller";

const invoiceRouter = Router()

invoiceRouter.post("/", authorize, protect(["shop_owner"]), createInvoice)

export default invoiceRouter