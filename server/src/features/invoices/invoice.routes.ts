import { Router } from "express"
import authorize, {protect} from "../../shared/middleware/auth.middleware";
import {createInvoice, getInvoice, getInvoices} from "./invoice.controller";

const invoiceRouter = Router()

invoiceRouter.get("/", authorize, protect(["shop_owner"]), getInvoices)

invoiceRouter.get("/", authorize, protect(["shop_owner"]), getInvoice)

invoiceRouter.post("/", authorize, protect(["shop_owner"]), createInvoice)

export default invoiceRouter