import { Router } from "express"
import {getUser, getUserInfo, getUsers} from "./user.controller";
import authorize, {protect} from "../../shared/middleware/auth.middleware";

const userRouter = Router()

userRouter.get("/me", authorize, getUserInfo)

userRouter.get("/", authorize, protect(["admin"]), getUsers)

userRouter.get("/:id", authorize, protect(["admin"]), getUser)

userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }))

userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user" }))

userRouter.get("/:id", (req, res) => res.send({ title: "DELETE user" }))

export default userRouter