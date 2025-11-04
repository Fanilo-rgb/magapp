import catchErrors from "../../shared/utils/catchErrors";
import {holderType, itemType, paymentType} from "./types";
import {validateRequiredFields} from "../../shared/utils/helper";
import {createError} from "../../shared/utils/function";
import {BAD_REQUEST, NOT_FOUND} from "../../constants/http";
import {handleNewSale, handleOwner} from "./invoice.service";

type CreateInvoiceBody = {
  holder: holderType
  products: itemType[]
  payements: paymentType[]
  date: Date
}

export const createInvoice = catchErrors(async (req, res) => {
  const shopId = req.shop?._id

  const { holder, products, payements, date }: CreateInvoiceBody = req.body

  if (!shopId) throw createError("Shop not found", NOT_FOUND)

  validateRequiredFields(holder, ["name"])
  products.forEach(product => validateRequiredFields(product, ["product", "quantity"]))
  payements.forEach(payment => validateRequiredFields(payment, ["type", "amount"]))
  if (!date || isNaN(new Date(date).getTime())) throw createError("The date must be a valid date", BAD_REQUEST)

  const owner = await handleOwner(holder, shopId)

  const newInvoice = await handleNewSale(shopId, owner, products, payements, date)

})