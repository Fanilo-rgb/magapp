import { Router } from "express"
import {createShop, getAllShop, getShopDetails} from "../controllers/shop.controller";
import authorize from "../middleware/auth.middleware";

const shopRoutes = Router()

shopRoutes.get("/", getAllShop)

shopRoutes.get("/:id", authorize, getShopDetails)

shopRoutes.post("/", authorize, createShop)

shopRoutes.put("/:id", (req, res) => res.send({ message: "UPDATE a shop" }))

shopRoutes.delete("/:id", (req, res) => res.send({ message: "DELETE a shop" }))

export default shopRoutes