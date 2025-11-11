import {holderType, InvoiceDocument, itemType, paymentType} from "./types";
import {addDistributor, verifyDistributor} from "../distributors/distributor.service";
import ClientModel, {ClientDocument} from "../clients/client.model";
import {createError} from "../../shared/utils/function";
import {BAD_REQUEST, NOT_FOUND} from "../../constants/http";
import {DistributorDocument} from "../distributors/distributor.model";
import InvoiceModel from "./invoice.model";
import SaleModel, {SaleDocument} from "../sales/sale.model";
import {getShopInventory, updateShopInventory} from "../inventory/inventory.service";
import mongoose from "mongoose";
import {ProductType} from "../products/product.model";

type refactoredHolderType = {
  _id: string
  name: string,
  type: "Client" | "Distributor"
}

type ownerType = { owner: ClientDocument , type: "Client" } | { owner: DistributorDocument, type: "Distributor" }

type handleOwnerType = (holder: holderType, shopId: string) => Promise<ownerType>

export const handleOwner: handleOwnerType = async (holder, shopId) => {
  if (holder.type !== "Client" && holder.type !== "Distributor") throw createError("Wrong person type", BAD_REQUEST)

  if (holder.type === "Client" && !holder._id) {
    const client: ClientDocument | null = await ClientModel.findOne({ name: holder.name, shop: shopId })
    if (client) {
      return {
        owner: client,
        type: "Client"
      }
    }

    const newClient = new ClientModel({
      name: holder.name,
      shop: shopId,
    })

    await newClient.save()
    return {
      owner: newClient as ClientDocument,
      type: "Client"
    }
  }

  if (holder.type === "Client") {
    const client: ClientDocument | null = await ClientModel.findById(holder._id)

    if (!client) throw createError("Client not found", NOT_FOUND)

    return {
      owner: client,
      type: "Client"
    }
  }

  if (!holder.numberCard) throw createError("A number card is required", BAD_REQUEST)

  const distributor = await verifyDistributor(holder.numberCard)

  if (!distributor) {
    const numberCard = holder.numberCard
    const name = holder.name.split(" ")[0]
    const surname = holder.name.slice(1).trim() === "" ? name : holder.name.slice(1)
    const nationality = "malagasy"

    const newDistributor = await addDistributor({numberCard, name, surname, nationality}, shopId)

    return {
      owner: newDistributor,
      type: "Distributor"
    }
  }

  return {
    owner: distributor,
    type: "Distributor"
  }

}

export const handleNewSale = async (shopId: string , holder: ownerType, products: itemType[], payments: paymentType[], date: Date, session: mongoose.mongo.ClientSession) => {
  const ownerId = holder.owner._id
  const ownerType = holder.type

  const shopProducts = await getShopInventory(shopId)

  const deliveredProducts = products.filter(p => p.delivered)

  const now = new Date(date)

  // verify all the payements and the products
  payments.forEach(payment => {
    if (payment.amount < 0) throw createError("The payment amount must be positive", BAD_REQUEST)
    const validTypes = ["cash", "mvola", "airtelMoney", "orangeMoney"]
    if (!validTypes.includes(payment.type)) throw createError(`The payment type ${payment.type} is not valid`, BAD_REQUEST)
  })

  products.forEach(item => {
    if (item.quantity <= 0) throw createError("The product quantity must be greater than 0", BAD_REQUEST)
    const productInShop = shopProducts.find(p => p._id.toString() === item.product.toString())
    if (!productInShop) throw createError("One of the products is not found in the shop", BAD_REQUEST)
  })

  //verify if the there is enough product in the inventory
  shopProducts.forEach(product => {
    const soldProduct = deliveredProducts.find(p => p.product.toString() === product._id.toString())
    if (soldProduct) {
      if (soldProduct.quantity > product.quantity) {
        throw createError(`Not enough quantity for product ${product.name}`, BAD_REQUEST)
      }
    }
  })

  // create the payment
  const newPayments = payments.map(payment => ({
    amount: payment.amount,
    type: payment.type,
    date: now
  }))

  const invoices = await InvoiceModel.find({ shop: shopId }).sort({ count: 1 })

  const newInvoiceCount = invoices.length === 0 ? 1 : (invoices[invoices.length -1 ].count || 0) + 1

  // create invoice
  const newInvoice = new InvoiceModel({
    count: newInvoiceCount,
    holder: ownerId,
    holderModel: ownerType,
    shop: shopId,
    payments: newPayments,
    savedAt: now
  })

  await newInvoice.save({ session })

  // create the sales attached to the invoice
  await Promise.all(products.map(product => {
    const newSale = new SaleModel({
      product: product.product,
      quantity: product.quantity,
      payed: product.payed,
      delivered: product.delivered,
      invoice: newInvoice._id
    })
    return newSale.save({ session })
  }))

  // update inventory
  await updateShopInventory(shopId, deliveredProducts.map(p => ({ _id: p.product.toString(), quantity: -p.quantity })), session, "update")

  return { success: true }
}

export const getInvoicesBetweenDate = async (startDate: Date, endDate: Date, shopId: string) => {
  const invoices: InvoiceDocument[] = await InvoiceModel.find({
    shop: shopId,
    createdAt: {
      $gte: startDate,
      $lte: endDate
    }
  })

  return invoices
}

export const getInvoiceItems = async (id: string) => {

  const items: SaleDocument[] = await SaleModel.find({ invoice: id })
    .populate("product")

  return items.map(item => ({
    product: item.product as unknown as ProductType,
    quantity: item.quantity,
  }))
}

export const getInvoiceDetails = async (id: string) => {
  const exist: InvoiceDocument | null = await InvoiceModel.findById(id)
    .populate("holder")

  if (!exist) throw createError("Invoice not found", NOT_FOUND)

  const invoiceItems = await getInvoiceItems(exist._id)

  const holder = exist.holder as unknown as { name: string, _id: string }

  const refactoredHolder: refactoredHolderType = {
    _id: holder._id,
    name: holder.name,
    type: exist.holderModel
  }

  return {
    _id: exist._id,
    count: exist.count,
    holder: refactoredHolder,
    products: invoiceItems
  }
}
