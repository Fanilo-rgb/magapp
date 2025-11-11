import mongoose from "mongoose";

export interface SaleDocument extends mongoose.Document {
  invoice: mongoose.Types.ObjectId
  product: mongoose.Types.ObjectId
  quantity: number
  payed: boolean
  delivered: boolean
  createdAt: Date
}

const saleSchema = new mongoose.Schema <SaleDocument> ({
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
    required: [ true, "The invoice is required" ]
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [ true, "The Product is required" ]
  },
  quantity: {
    type: Number,
    required: [ true, "The quantity is required" ],
    min: [1, "The quantity must be greater than 0" ]
  },
  payed: {
    type: Boolean,
    default: true
  },
  delivered: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

const SaleModel = mongoose.model <SaleDocument> ("Sale", saleSchema)

export default SaleModel
