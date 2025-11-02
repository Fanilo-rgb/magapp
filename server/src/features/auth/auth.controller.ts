import {RequestHandler} from "express";

import mongoose from "mongoose";
import UserModel, {UserDocument} from "../users/user.model";
import {createError} from "../../shared/utils/function";
import {CREATED, OK} from "../../constants/http";
import catchErrors from "../../shared/utils/catchErrors";
import {createToken} from "../../shared/utils/jwt";

export const signUp: RequestHandler = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { name, email, password } = req.body

    const existingUser = await UserModel.exists({ email: email })

    if (existingUser) throw createError("User with this email already exist", 409)

    const user: UserDocument = new UserModel({
      name: name,
      email: email,
      password: password
    })

    await user.save({ session })

    const token = createToken({ userId: user._id, email: user.email, role: user.role })

    await session.commitTransaction()
    await session.endSession()

    return res.status(CREATED).send({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user
      }
    })

  } catch (e) {
    await session.abortTransaction()
    await session.endSession()
    next(e)
  }
}

export const signIn = catchErrors(
  async (req, res) => {
    const { email, password } = req.body

    const user: UserDocument | null = await UserModel.findOne({ email })

    if (!user) throw createError("User not found", 404)

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) throw createError("Invalid password", 401)

    const token = createToken({ userId: user._id, email: user.email, role: user.role })

    return res.status(OK).send({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user
      }
    })
  }
)

export const signOut = () => {}