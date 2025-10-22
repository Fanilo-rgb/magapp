import mongoose, {model, Schema} from "mongoose";

export interface ProductDocument extends mongoose.Document {
  name: string
  bv: number
  order: number
  shop: mongoose.Types.ObjectId
  price?: number | null
  type?: "tea" | "capsule" | "powder" | "plaster" | "compressed" | "pill" | "candy" | null
}

const productSchema = new Schema<ProductDocument>({
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
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
    index: true
  },
  price: {
    type: Number,
    default: null
  },
  order: {
    type: Number,
    required: [true, "The order is required"],
  },
  type: {
    type: String,
    enum: {
      values: ["tea", "capsule", "powder", "plaster", "compressed", "pill", "candy"],
      message: "{VALUE} is not a type of product",
      default: null
    }
  }
})

productSchema.pre("save", function (next) {
  if (this.price && (this.bv * 3600 === this.price)) {
    this.price = null
  }

  next()
})

const ProductModel = model<ProductDocument>("Product", productSchema)

export default ProductModel