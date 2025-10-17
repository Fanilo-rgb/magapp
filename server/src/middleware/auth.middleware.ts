import {UNAUTHORIZED} from "../constants/http";
import UserModel from "../models/user.model";
import catchErrors from "../utils/catchErrors";
import {createError} from "../global/function";
import {verifyToken} from "../utils/jwt";

const authorize = catchErrors(
  async (req, res, next) => {
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
  }
)

export default authorize
