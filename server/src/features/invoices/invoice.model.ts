import mongoose, {model, Schema} from "mongoose";

export interface Payment {
  amount: number
  type: "cash" | "mvola" | "airtelMoney" | "orangeMoney"
  date: Date
}

export interface InvoiceDocument extends mongoose.Document {
  count: number
  holder: mongoose.Types.ObjectId
  holderModel: "Client" | "Distributor"
  offlineId: string
  shop: mongoose.Types.ObjectId
  payments: Payment[]
  createdAt: Date
  updatedAt: Date
}

const payementSchema = new Schema({
  amount: {
    type: Number,
    required: [true, "The amount is required"],
    min: [200, "The amount must be at least 200 ar"]
  },
  type: {
    type: String,
    enum: {
      values: ["cash", "mvola", "airtelMoney", "orangeMoney"],
      message: "{VALUE} is not a valid type"
    },
    required: [true, "The type is required"]
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

const invoiceSchema = new Schema<InvoiceDocument>({
  count: Number,
  holder: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "holderModel" },
  holderModel: {
    type: String,
    required: true,
    enum: {
      values: ["Client", "Distributor"],
      message: "{VALUE} is not a valid holder model",
    },
  },
  offlineId: { type: String, required: [true, "A offline id is required"] },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: [true, "A shop is required"],
  },
  payments: {
    type: [payementSchema],
    default: [],
  },
}, { timestamps: true })

const InvoiceModel = model<InvoiceDocument>("Invoice", invoiceSchema)

export default InvoiceModel
