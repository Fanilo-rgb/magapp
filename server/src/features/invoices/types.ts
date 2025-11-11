import mongoose from "mongoose";
import {SaleDocument} from "../sales/sale.model";

export interface Payment {
  amount: number
  type: "cash" | "mvola" | "airtelMoney" | "orangeMoney"
  date: Date
}

export interface PaymentDocument extends mongoose.Document {
  amount: number
  type: "cash" | "mvola" | "airtelMoney" | "orangeMoney"
  date: Date
}

export interface InvoiceDocument extends mongoose.Document {
  _id: string
  count: number
  holder: mongoose.Types.ObjectId
  holderModel: "Client" | "Distributor"
  shop: mongoose.Types.ObjectId
  payments: Payment[]
  savedAt: Date
  createdAt: Date
  updatedAt: Date
}

export type holderType = {
  _id?: mongoose.Types.ObjectId,
  numberCard?: string,
  name: string
  type: "Client" | "Distributor"
}

export type itemType = Pick<SaleDocument, "product" | "quantity" | "payed" | "delivered">

export type paymentType = Pick<PaymentDocument, "type" | "amount">
