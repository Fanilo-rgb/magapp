import mongoose, {model, Schema} from "mongoose";

export interface ProductDocument extends mongoose.Document {
  _id: string
  name: string
  bv: number
  order: number
  price: number | null
}

export interface UpdateShopProductDto {
  name: string;
  price: number;
}

export interface UpdateGlobalProductDto {
  name: string;
  bv: number;
  price: number | null;
  order: number;
}

export interface ProductShopDocument extends mongoose.Document {
  shopId: mongoose.Types.ObjectId
  productGlobalId: mongoose.Types.ObjectId
  name: string
  price: number
  overridden: string[]
}

export type ProductType = Pick<ProductDocument, "_id" | "name" | "bv" | "price" | "order">
export type ProductWithoutId = Omit<ProductType, "_id">

const productGlobalSchema = new Schema<ProductDocument>({
  name: {
    type: String,
    trim: true,
    unique: [true, "This product already exist"],
    required: [true, "The name of the product is required"]
  },
  bv: {
    type: Number,
    min: 1,
    required: [true, "The BV is required"]
  },
  price: {
    type: Number,
    default: null
  },
  order: {
    type: Number,
    required: [true, "The order is required"],
  }
})

const productShopSchema = new Schema<ProductShopDocument>({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
    index: true
  },
  productGlobalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true
  },

  name: {
    type: String,
    trim: true,
    unique: [true, "This product already exist"],
    required: [true, "The name is required"]
  },
  price: {
    type: Number,
    required: [true, "The price is required"]
  },

  overridden: [String],
})

productGlobalSchema.pre("save", function (next) {
  if (this.price && (this.bv * 3600 === this.price)) {
    this.price = null
  }

  next()
})

const ProductModel = model<ProductDocument>("Product", productGlobalSchema)

export const ProductShopModel = model<ProductShopDocument>("ProductShop", productShopSchema)

export default ProductModel
