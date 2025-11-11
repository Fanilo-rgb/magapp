import catchErrors from "../../shared/utils/catchErrors";
import {createError} from "../../shared/utils/function";
import ProductModel, {ProductWithoutId, UpdateGlobalProductDto, UpdateShopProductDto} from "./product.model";
import {BAD_REQUEST, CREATED, NOT_FOUND, OK, UNAUTHORIZED} from "../../constants/http";
import {
  rebaseGlobalProducts,
  updateProductForShop,
  getProductDetails,
  getProductsForShop,
  updateGlobalProduct
} from "./product.service";
import {validateRequiredFields, validateShopOwnership, verifyShopId} from "../../shared/utils/helper";

export const rebaseProduct = catchErrors(async (req, res) => {
  const result = await rebaseGlobalProducts()

  return res.status(CREATED).send({
    success: true,
    data: result
  })
})

export const updateShopProduct = catchErrors(async (req, res) => {
  const { shopId, id } = req.params

  const data: UpdateShopProductDto = req.body

  validateShopOwnership(req, shopId)

  if (!id) throw createError("Product ID is required", BAD_REQUEST)

  validateRequiredFields(data, ["name", "price"])

  const updated = await updateProductForShop(shopId, id, data)

  return res.status(OK).send({
    success: true,
    message: "Product updated",
    data: updated
  })

})

export const updateProduct = catchErrors(async (req, res) => {

  const data: UpdateGlobalProductDto = req.body

  const {id} = req.params

  validateRequiredFields(data, ['name', 'bv', 'order']);

  if (!id) throw createError("Product not found", NOT_FOUND)

  const updatedProduct = await updateGlobalProduct(id, data)
  
  return res.status(OK).send({
    success: true,
    message: "Product updated",
    data: updatedProduct
  })

})

export const getProduct = catchErrors(async (req, res) => {
  const {id} = req.params

  const product = await getProductDetails(id)

  return res.status(OK).send({
    success: true,
    data: product
  })
})

export const createProduct = catchErrors(async (req, res) => {
  const product: ProductWithoutId = req.body;

  const newProduct = await ProductModel.create(product); // Use .create() instead of new + save

  return res.status(CREATED).send({
    success: true,
    message: "Product created",
    data: newProduct
  });
});

export const getShopProducts = catchErrors(async (req, res) => {

  const shopId = verifyShopId(req.shop?._id)

  const products = await getProductsForShop(shopId)

  return res.status(OK).send({
    success: true,
    data: products
  })
})

export const deleteProduct = catchErrors(async (req, res) => {
  const id = req.params.id

  const existing = await ProductModel.findById(id)

  if (!existing) throw createError("Product not found", NOT_FOUND)

  await existing.deleteOne()

  return res.status(OK).send({
    success: true,
    message: "Product deleted"
  })
})
