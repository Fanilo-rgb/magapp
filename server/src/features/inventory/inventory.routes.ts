import { Router } from "express"
import {getInventory, getStockEntry, updateInventory} from "./inventory.controller";
import authorize, {protect} from "../../shared/middleware/auth.middleware";

const inventoryRouter = Router()

inventoryRouter.get("/", authorize, protect(["shop_owner"]), getInventory)

inventoryRouter.get("/stock-entry", authorize, protect(["shop_owner"]), getStockEntry)

inventoryRouter.post("/", authorize, protect(["shop_owner"]), updateInventory)

export default inventoryRouter