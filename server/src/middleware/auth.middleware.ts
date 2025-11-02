import {FORBIDDEN, NOT_FOUND, UNAUTHORIZED} from "../constants/http";
import {UserDocument} from "../models/user.model";
import catchErrors from "../utils/catchErrors";
import {createError} from "../utils/function";
import {verifyToken} from "../utils/jwt";
import ShopModel from "../models/shop.model";
import {findUser} from "../services/user.service";

const authorize = catchErrors(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) throw createError("Unauthorized", UNAUTHORIZED)

  const decoded = verifyToken(token)

  const userId = (decoded as { userId: string }).userId

  req.user = await findUser(userId, createError("Unauthorized", UNAUTHORIZED))

  next()
})

export default authorize

type UserRole = UserDocument["role"]

export const protect = (roles: UserRole[] = []) => {
  return catchErrors(async (req, res, next) => {
    if (!req.user) throw createError("Unauthorized: You need to log in", UNAUTHORIZED);

    if (roles.length && !roles.includes(req.user.role)) {
      throw createError("Unauthorized: insufficient permissions", FORBIDDEN);
    }

    if (roles.includes("shop_owner")) {
      const shop = await ShopModel.findOne({ owner: req.user._id });
      if (!shop) throw createError("Shop not found", NOT_FOUND);
      req.shop = shop;
    }

    next();
  });
};
