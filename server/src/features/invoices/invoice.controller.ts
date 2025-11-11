import catchErrors from "../../shared/utils/catchErrors";
import {holderType, itemType, paymentType} from "./types";
import {validateRequiredFields, verifyShopId} from "../../shared/utils/helper";
import {createError} from "../../shared/utils/function";
import {BAD_REQUEST, CREATED, OK} from "../../constants/http";
import {getInvoiceDetails, handleNewSale, handleOwner} from "./invoice.service";
import mongoose from "mongoose";
import InvoiceModel from "./invoice.model";

type CreateInvoiceBody = {
  holder: holderType
  products: itemType[]
  payements: paymentType[]
  date: Date
}

export const createInvoice = catchErrors(async (req, res, next) => {
  const shopId = verifyShopId(req.shop?._id)

  const { holder, products, payements, date }: CreateInvoiceBody = req.body

  validateRequiredFields(holder, ["name", "type"])
  products.forEach(product => {
    validateRequiredFields(product, ["product", "quantity"])
    if (product.delivered === undefined) throw createError("The delivered field is required for each product", BAD_REQUEST)
    if (product.payed === undefined) throw createError("The payed field is required for each product", BAD_REQUEST)
  })
  payements.forEach(payment => validateRequiredFields(payment, ["type", "amount"]))
  if (!date || isNaN(new Date(date).getTime())) throw createError("The date must be a valid date", BAD_REQUEST)

  const session = await mongoose.startSession()
  session.startTransaction()

  try {

    const owner = await handleOwner(holder, shopId)
    const { success } = await handleNewSale(shopId, owner, products, payements, date, session)

    await session.commitTransaction()
    await session.endSession()

    return res.status(CREATED).send({
      success,
      message: "Invoice created successfully"
    })

  } catch (e) {
    await session.abortTransaction()
    await session.endSession()
    next(e)
  }
})

export const getInvoices = catchErrors(async (req, res) => {
  const shopId = verifyShopId(req.shop?._id)

  const invoices = await InvoiceModel.find({ shop: shopId })
    .sort({ createdAt: 1 })
    .populate("holder", "name surname numberCard")
    .select("-__v -shop -payments")

  return res.status(OK).send({
    success: true,
    data: invoices
  })
})

export const getInvoice = catchErrors(async (req, res) => {
  const shopId = verifyShopId(req.shop?._id)
  const { id } = req.params

  const invoiceWithDetail = await getInvoiceDetails(id)

  return res.status(OK).send({
    success: true,
    data: invoiceWithDetail
  })

})
