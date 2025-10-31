import fastapi from "../utils/fastapi";
import {createError} from "../global/function";
import ProductModel, {
  ProductDocument,
  ProductShopDocument,
  ProductShopModel,
  ProductType,
  ProductWithoutId, UpdateGlobalProductDto, UpdateShopProductDto
} from "../models/product.model";
import {NOT_FOUND} from "../constants/http";

export const getProductFromExcel = async (): Promise<ProductWithoutId[]> => {
  const response = await fastapi.get('/products')
  if (!response) throw createError("No response from FastAPI", 502)
  return response.data
}

export const rebaseGlobalProducts = async (): Promise<ProductDocument[]> => {
  const products = await getProductFromExcel()

  const ExistingProducts: ProductDocument[] = await ProductModel.find()

  for (const product of products) {

    const exist = ExistingProducts.find(p => p.order === product.order)

    if (exist) {
      exist.name = product.name
      exist.bv = product.bv
      exist.price = product.price
      await exist.save()
    } else {
      const p = new ProductModel({ ...product })
      await p.save()
    }
  }
  return ProductModel.find()
    .sort({order: 1})
    .select("-__v");
}

export const updateProductForShop = async (shopId: string, productId: string, data: UpdateShopProductDto): Promise<ProductWithoutId> => {

  const existing: ProductDocument | null = await ProductModel.findById(productId);

  if (!existing) throw createError("Product does not exist", NOT_FOUND)

  const product: ProductShopDocument | null = await ProductShopModel.findOne({ shopId, productGlobalId: productId });

  if (product) {
    product.name = data.name
    product.price = data.price
    product.overridden = Object.keys(data)
    await product.save()

  } else {
    const newProduct = new ProductShopModel({
      shopId,
      productGlobalId: productId,
      name: data.name,
      price: data.price,
      overridden: Object.keys(data)
    })
    await newProduct.save()
  }

  return {
    ...data,
    bv: existing.bv,
    order: existing.order
  }
}

export const getProductDetails = async (id: string): Promise<ProductType> => {

  const exist: ProductDocument | null = await ProductModel.findById(id)
  const override: ProductShopDocument | null = await ProductShopModel.findById(id)

  if (!exist) throw createError("Product not found", NOT_FOUND)

  return {
    _id: exist._id,
    bv: exist.bv,
    order: exist.order,
    name: override ? override.name : exist.name,
    price: override ? override.price : exist.price !== null ? exist.price : exist.bv * 3600
  }
}

export const getProductsForShop = async (shopId: string) => {
  const globals: ProductDocument[] = await ProductModel.find()
    .sort({ order: 1 })
    .select("-__v")

  const overrides: ProductShopDocument[] = await ProductShopModel.find({ shopId })

  return globals.map(g => {
    const o = overrides.find(x => x.productGlobalId.toString() === shopId)

    return o ? {
      ...g.toObject(),
      name: o.name,
      price: o ? o.price : g.price !== null ? g.price : g.bv * 3600
    } : g.toObject()
  })
}

export const updateGlobalProduct = async (id: string, data: UpdateGlobalProductDto): Promise<ProductType> => {
  const product: ProductDocument | null = await ProductModel.findById(id)

  if (!product) throw createError("Product not found", NOT_FOUND)

  product.name = data.name
  product.bv = data.bv
  product.price = data.price
  product.order = data.order

  await product.save()

  return {
    _id: product._id,
    bv: product.bv,
    order: product.order,
    name: product.name,
    price: product.price !== null ? product.price : product.bv * 3600
  }
}