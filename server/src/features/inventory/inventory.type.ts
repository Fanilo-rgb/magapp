import mongoose from "mongoose";
import {ProductDocument, ProductType} from "../products/product.model";

export interface InventoryDocument extends mongoose.Document {
  product: mongoose.Types.ObjectId,
  quantity: number,
  shop: mongoose.Types.ObjectId
  updateQuantity(quantity: number, session: mongoose.mongo.ClientSession): Promise<void>
}

export type InventoryType = Pick<InventoryDocument, "quantity"> & Pick<ProductDocument, "_id" | "name" | "order" | "bv" | "price">

export type InventoryUpdateType = Pick<InventoryType, "_id" | "quantity">

export type StockEntryAggregationResult = {
  _id: number,
  products: {
    quantity: number,
    product: ProductType
  }[]
}
