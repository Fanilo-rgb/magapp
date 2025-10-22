import fastapi from "../utils/fastapi"
import catchErrors from "../utils/catchErrors";
import {createError} from "../global/function";
import ProductModel, {ProductDocument} from "../models/product.model";
import {BAD_REQUEST, CREATED, NOT_FOUND, OK} from "../constants/http";

export const getProductsFromExcel = catchErrors(
  async (req, res) => {
    const response = await fastapi.get('/products')

    if (!response) throw createError("No response from FastAPI", 502)

    return res.status(200).send(response.data)
  }
)

export const createProduct = catchErrors(
  async (req, res) => {

    if (!req.shop) throw createError("Shop not found", NOT_FOUND)

    const product: ProductDocument = req.body

    const products: ProductDocument[] = await ProductModel.find({ shop: req.shop._id })

    products.forEach(p => {
      if (p.order === product.order) throw createError(`Duplicated order: A product with this order already exist: {name: '${p.name}', order: ${p.order}}`, BAD_REQUEST)
    })

    const newProduct = new ProductModel({ ...product, shop: req.shop._id})
    await newProduct.save()

    return res.status(CREATED).send({
      success: true,
      message: "Product created",
      data: newProduct
    })
  }
)

type ProductType = Pick<ProductDocument, "_id" | "name" | "bv" | "price" | "order">

export const getProducts = catchErrors(
  async (req, res) => {

    const products: ProductType[] = await ProductModel.find({ shop: req.shop?._id })
      .sort({ order: 1 })
      .select("-__v -shop")

    const ps = products.map(p => ({
      _id: p._id,
      name: p.name,
      bv: p.bv,
      price: p.price !== null ? p.price : p.bv * 3600,
      order: p.order
    }))

    return res.status(OK).send({
      success: true,
      data: ps
    })

  }
)

export const deleteProduct = catchErrors(
  async (req, res) => {
    const id = req.params.id

    const existing = await ProductModel.findOne({ _id: id, shop: req.shop?.id })

    if (!existing) throw createError("Product not found", 404)

    await existing.deleteOne()

    return res.status(OK).send({
      success: true,
      message: "Product deleted"
    })
  }
)
