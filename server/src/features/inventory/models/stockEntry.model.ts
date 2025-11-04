import mongoose from "mongoose";

export interface StockEntryDocument extends mongoose.Document {
  product: mongoose.Types.ObjectId
  quantity: number
  shop: mongoose.Types.ObjectId
  createdAt: Date
}

const stockEntrySchema = new mongoose.Schema <StockEntryDocument> ({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [ true, "The Product is required" ],
    index: true
  },
  quantity: {
    type: Number,
    required: [ true, "The quantity is required" ],
    min: [1, "The quantity must be greater than 0" ]
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: [true, "A shop is required"],
    index: true
  },
}, { timestamps: true })

const StockEntryModel = mongoose.model <StockEntryDocument> ("StockEntry", stockEntrySchema)

export default StockEntryModel