import mongoose, {model, Schema} from "mongoose";

export interface ClientDocument extends mongoose.Document {
  _id: string
  name: string,
  gender?: "male" | "female"
  dateOfBirth?: Date
  height?: number
  weight?: number
  distributor?: mongoose.Types.ObjectId | null
  phone?: string
  email?: string | null
  createdAt?: Date
  updatedAt?: Date
  isDeleted: boolean
  deletedAt?: Date | null
  shop: mongoose.Types.ObjectId
}

const clientSchema = new Schema<ClientDocument>({
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
    default: null
  },
  height: {
    type: Number,
    min: [30, "The height must be at least 30"],
    max: [300, "The height must be at most 200"],
    default: null
  },
  weight: {
    type: Number,
    min: [10, "The weight must be at least 10"],
    max: [200, "The weight must be at most 200"],
    default: null
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
