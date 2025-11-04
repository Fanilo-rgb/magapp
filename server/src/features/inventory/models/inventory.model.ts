import mongoose, {model, Schema} from "mongoose";
import {InventoryDocument} from "../inventory.type";

const inventorySchema = new Schema<InventoryDocument>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "The product is required"],
    index: true
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

inventorySchema.methods.updateQuantity = async function (quantity: number, session: mongoose.mongo.ClientSession) {
  this.quantity += quantity
  await this.save({ session })
}

const InventoryModel = model<InventoryDocument>("Inventory", inventorySchema)

export default InventoryModel
