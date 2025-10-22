import {FORBIDDEN, NOT_FOUND, UNAUTHORIZED} from "../constants/http";
import UserModel, {UserDocument} from "../models/user.model";
import catchErrors from "../utils/catchErrors";
import {createError} from "../global/function";
import {verifyToken} from "../utils/jwt";
import ShopModel from "../models/shop.model";

const authorize = catchErrors(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) throw createError("Unauthorized", UNAUTHORIZED)

  const decoded = verifyToken(token)

  const user = await UserModel.findById((decoded as { userId: string }).userId)

  if (!user) throw createError("Unauthorized", UNAUTHORIZED)

  req.user = user
  next()
})

export default authorize

type UserRole = UserDocument["role"]

export const protect = (roles: UserRole[] = []) => {
  return catchErrors(async (req, res, next) => {
    if (!req.user) throw createError("Unauthorized: You need to log in", UNAUTHORIZED)

    if (roles.length && !roles.includes(req.user.role)) throw createError("Unauthorized: must be a shop_owner or admin", FORBIDDEN)

    const shop = await ShopModel.findOne({ owner: req.user._id })

    if (!shop) throw createError("Shop not found", NOT_FOUND)

    req.shop = shop

    next()
  })
}
