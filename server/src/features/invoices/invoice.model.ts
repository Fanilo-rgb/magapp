import mongoose, {model, Schema} from "mongoose";
import {InvoiceDocument, PaymentDocument} from "./types";

const payementSchema = new Schema<PaymentDocument>({
  amount: {
    type: Number,
    required: [true, "The amount is required"],
    min: [0, "The amount must be positive"]
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
    required: [true, "The date is required"]
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
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: [true, "A shop is required"],
    index: true
  },
  payments: {
    type: [payementSchema],
    default: [],
  },
  savedAt: {
    type: Date,
    required: [true, "The saved at is required"],
  }
}, { timestamps: true })

const InvoiceModel = model<InvoiceDocument>("Invoice", invoiceSchema)

export default InvoiceModel
