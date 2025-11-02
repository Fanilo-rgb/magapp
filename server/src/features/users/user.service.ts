import UserModel, {UserDocument} from "./user.model";
import {createError, CustomError} from "../../shared/utils/function";
import {NOT_FOUND} from "../../constants/http";

type findUserType = (userId: string, customError?: CustomError) => Promise<UserDocument>

export const findUser: findUserType = async (userId: string, customError)=> {
  const user: UserDocument | null = await UserModel.findById(userId)
    .select("name email role _id")
  if (!user) throw customError || createError("User not found", NOT_FOUND)

  return user
}