import InvoiceModel from "../invoices/invoice.model";
import {InvoiceDocument} from "../invoices/types";
import {getInvoiceItems, getInvoicesBetweenDate} from "../invoices/invoice.service";

type Sale = {
  name: string;
  price: number;
  bv: number;
  quantity: number;
}

type saleDetailsType ={
  sales: Sale[];
  total: number;
}

type getShopSalesType = (shopId: string, date?: "today" | "thisMonth") => Promise<saleDetailsType>

export const groupeSales = (sales: Sale[]) => {
  let groupedSales : Sale[] = []

  sales.forEach(sale => {
    const found = groupedSales.find(rs => rs.name === sale.name)
    if (!found) {
      groupedSales = [ ...groupedSales, sale ]
    } else {
      groupedSales = groupedSales.map(rs => ({
        ...rs,
        quantity: rs.name === sale.name ? rs.quantity + sale.quantity : rs.quantity
      }))
    }
  })

  return groupedSales
}

export const getShopSales: getShopSalesType = async (shopId, date = "today") => {
  let invoices: InvoiceDocument[] = []

  if (!date) invoices = await InvoiceModel.find({ shop: shopId })

  if (date === "today") {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    invoices = await getInvoicesBetweenDate(startOfDay, endOfDay, shopId)
  }

  if (date === "thisMonth") {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999)

    invoices = await getInvoicesBetweenDate(startOfMonth, endOfMonth, shopId)
  }

  let allSales : Sale[] = []

  for (const invoice of invoices) {
    const items = await getInvoiceItems(invoice._id.toString())

    const refinedItems = items.map(item => ({
      name: item.product.name,
      price: item.product.price ? item.product.price : item.product.bv * 3600,
      bv: item.product.bv,
      quantity: item.quantity
    }))

    refinedItems.forEach(item => allSales = [...allSales, item])
  }

  let sales = groupeSales(allSales)

  return {
    sales,
    total: sales.reduce((acc, s) => acc + s.quantity * s.price, 0)
  } as saleDetailsType
}
