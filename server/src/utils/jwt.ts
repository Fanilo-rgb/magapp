import jwt from "jsonwebtoken"
import {JWT_SECRET} from "../constants/env";

export const createToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET)