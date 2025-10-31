import mongoose, {model, Schema} from "mongoose";

export interface InventoryDocument extends mongoose.Document {
  product: mongoose.Types.ObjectId,
  quantity: number,
  shop: mongoose.Types.ObjectId
}

const inventorySchema = new Schema<InventoryDocument>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "The product is required"]
  },
  quantity: {
    type: Number,
    min: [0, "The quantity must be at least 0"],
    default: 0
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  }
})

const InventoryModel = model<InventoryDocument>("Inventory", inventorySchema)

export default InventoryModel
