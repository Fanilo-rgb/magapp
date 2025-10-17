import mongoose, {model, Schema} from "mongoose";

export interface ShopDocument extends mongoose.Document {
  name: string
  owner: mongoose.Types.ObjectId
  address?: string
  phone?: string
  email?: string
  status: "active" | "inactive" |"suspended"
  createdAt: Date
  updatedAt: Date
}

const shopSchema = new Schema<ShopDocument>({
  name: {
    type: String,
    unique: true,
    required: [true, "A name is required"],
    minlength: 3,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  address: { type: String, default: null },
  phone: { type: String, default: null },
  email: { type: String, default: null, lowercase: true, trim: true },
  status: {
    type: String,
    enum: {
      values: ["active", "inactive", "suspended"],
      message: "{VALUE} is not a valid status"
    },
    default: "inactive"
  }
}, { timestamps: true })

const ShopModel = model<ShopDocument>("Shop", shopSchema)

export default ShopModel