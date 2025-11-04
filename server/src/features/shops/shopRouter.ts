import { Router } from "express"
import {createShop, getAllShop, getShopDetails} from "./shop.controller";
import authorize, {protect} from "../../shared/middleware/auth.middleware";

const shopRouter = Router()

shopRouter.get("/", authorize, protect(["admin"]), getAllShop)

shopRouter.get("/:id", authorize, protect(["shop_owner", "admin"]), getShopDetails)

shopRouter.post("/", authorize, createShop)

shopRouter.put("/:id", (req, res) => res.send({ message: "UPDATE a shop" }))

shopRouter.delete("/:id", (req, res) => res.send({ message: "DELETE a shop" }))

export default shopRouter