import mongoose, {model, Schema} from "mongoose";

export interface CheckupDocument extends mongoose.Document {
  count: number
  patient: mongoose.Types.ObjectId
  userModel: "Client" | "Distributor"
  offlineId: string
  isDeleted: boolean
  deletedAt: Date | null
  shop: mongoose.Types.ObjectId
  createdAt: Date
}

const checkupSchema = new Schema<CheckupDocument>({
  count: Number,
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "userModel",
    required: [true, "A client is required"],
  },
  userModel: {
    type: String,
    required: [true, "A user model is required"],
    enum: {
      values: ["Client", "Distributor"],
      message: "{VALUE} is not a valid user model"
    },
  },
  offlineId: { type: String, required: [true, "A offline id is required"] },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: { type: Date, default: null },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: [true, "A shop is required"],
  }
})

const CheckupModel = model<CheckupDocument>("Checkup", checkupSchema)

export default CheckupModel
