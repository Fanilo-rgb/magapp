import catchErrors from "../../shared/utils/catchErrors";
import UserModel from "./user.model";
import {OK} from "../../constants/http";
import {createError} from "../../shared/utils/function";

export const getUsers = catchErrors(
  async (req, res) => {
    const users = await UserModel.find().select("-password -__v")

    return res.status(OK).send({ success: true, data: users });
  }
)

export const getUser = catchErrors(
  async (req, res) => {
    const user = await UserModel.findById(req.params.id).select("-password -__v")

    if (!user) throw createError("User not found", 404)

    return res.status(OK).send({ success: true, data: user });
  }
)