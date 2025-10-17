import mongoose, {model} from "mongoose";
import {compareValue, hashValue} from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
  _id: string
  name: string
  email: string
  password: string
  role: "admin" | "user" | "shop_owner"
  createdAt: Date
  updatedAt: Date
  comparePassword(value: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [50, "Name must be at most 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email'],
    index: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user", "shop_owner"],
      message: '{VALUE} is not a valid role'
    },
    default: "user"
  }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  this.password = await hashValue(this.password)
  next()
})

userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password)
}

const UserModel = model<UserDocument>("User", userSchema)

export default UserModel
