import { Router } from "express"
import {getUser, getUsers} from "../controllers/user.controller";
import authorize from "../middleware/auth.middleware";

const userRouter = Router()

userRouter.get("/", getUsers)

userRouter.get("/:id", authorize, getUser)

userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }))

userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user" }))

userRouter.get("/:id", (req, res) => res.send({ title: "DELETE user" }))

export default userRouter