import mongoose, {model, Schema} from "mongoose";

export interface ClientDocument extends mongoose.Document {
  _id: string
  offlineId: string
  name: string,
  gender: "male" | "female"
  dateOfBirth: Date
  height: number
  weight: number
  distributor: mongoose.Types.ObjectId
  phone: string
  email?: string | null
  createdAt?: Date
  updatedAt?: Date
  isDeleted: boolean
  deletedAt?: Date | null
  shop: mongoose.Types.ObjectId
}

const clientSchema = new Schema<ClientDocument>({
  offlineId: { type: String, required: [true, "A offline id is required"] },
  name: {
    type: String,
    required: [true, "A name is required"],
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["male" , "female"],
      message: "{VALUE} is not a valid gender"
    },
    default: null
  },
  dateOfBirth: {
    type: Date,
    required: [true, "A date of birth is required"],
  },
  height: {
    type: Number,
    required: [true, "A height is required"],
    min: [30, "The height must be at least 30"],
    max: [300, "The height must be at most 200"],
  },
  weight: {
    type: Number,
    required: [true, "A weight is required"],
    min: [10, "The weight must be at least 10"],
    max: [200, "The weight must be at most 200"],
  },
  phone: {
    type: String,
    default: null
  },
  distributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Distributor",
    default: null
  },
  email: { type: String, default: null, lowercase: true, trim: true },
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
}, { timestamps: true })

const ClientModel = model<ClientDocument>("Client", clientSchema)

export default ClientModel
