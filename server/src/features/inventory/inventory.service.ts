import {createError} from "../../shared/utils/function";
import {NOT_FOUND} from "../../constants/http";
import {getProductsForShop} from "../products/product.service";
import InventoryModel from "./models/inventory.model";
import {InventoryDocument, InventoryType, InventoryUpdateType, StockEntryAggregationResult} from "./inventory.type";
import StockEntryModel from "./models/stockEntry.model";
import mongoose from "mongoose";

export const getShopInventory = async (shopId: string | undefined) => {
  if (!shopId) throw createError("Shop not found", NOT_FOUND)

  const shopProducts = await getProductsForShop(shopId)

  const inventory: InventoryDocument[] = await InventoryModel.find({ shop: shopId })

  return shopProducts.map(p => {
    const found = inventory.find(i => i.product.toString() === p._id.toString())

    const {_id, name, bv, price, order} = p

    return {
      _id,
      order,
      name,
      bv,
      price,
      quantity: found ? found.quantity : 0,
    } as InventoryType
  })
}

export const updateShopInventory = async (shopId: string | undefined, updates: InventoryUpdateType[], session: mongoose.mongo.ClientSession) => {

  const shopInventory = await getShopInventory(shopId)

  // verification si chaque produit existe dans l'inventaire

  updates.forEach(update => {
    const product = shopInventory.find(p => p._id.toString() === update._id)
    if (!product) throw createError("Product not found", NOT_FOUND)
  })

  // si on arrive ici, c'est que tous les produits existent

  for (const update of updates) {
    const i: InventoryDocument | null = await InventoryModel.findOne({ product: update._id.toString() })

    if (update.quantity <= 0) continue

    if (i) {
      await i.updateQuantity(update.quantity, session)
    } else {
      const newInventory = new InventoryModel({
        product: update._id,
        quantity: update.quantity,
        shop: shopId
      })

      await newInventory.save({ session })
    }

    const newEntry = new StockEntryModel({
      product: update._id,
      quantity: update.quantity,
      shop: shopId
    })

    await newEntry.save({ session })
  }

}

export const getShopStockEntry = async (shopId: string | undefined, date: Date) => {
  if (!shopId) throw createError("Shop not found", NOT_FOUND)

  const shopProducts = await getProductsForShop(shopId)

  const startOfDay = new Date(new Date(date).setHours(0, 0, 0, 0))
  const endOfDay = new Date(new Date(date).setHours(23, 59, 59, 999))

  const entries = await StockEntryModel.aggregate([
    // 1️⃣ On filtre sur la date du jour (ex: aujourd’hui)
    {
      $match: {
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay
        },
      },
    },
    // 2️⃣ On extrait l’heure
    {
      $addFields: {
        hour: {$hour: {date: "$createdAt", timezone: "Indian/Antananarivo"}},
      },
    },
    // 3️⃣ On groupe par heure et produit
    {
      $group: {
        _id: {
          hour: "$hour",
          product: "$product",
        },
        totalQuantity: {$sum: "$quantity"},
      },
    },
    // 4️⃣ On regroupe encore par heure pour avoir une liste de produits par heure
    {
      $group: {
        _id: "$_id.hour",
        products: {
          $push: {
            product: "$_id.product",
            totalQuantity: "$totalQuantity",
          },
        },
      },
    },
    // 5️⃣ On trie les heures dans l’ordre croissant
    {
      $sort: {_id: 1},
    },
    // 6️⃣ On populate les produits
    {
      $lookup: {
        from: "products", // nom de la collection Product
        localField: "products.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    // 7️⃣ On map les productDetails dans la liste de produits
    {
      $addFields: {
        products: {
          $map: {
            input: "$products",
            as: "p",
            in: {
              quantity: "$$p.totalQuantity",
              product: {
                $arrayElemAt: [{
                  $filter: {
                    input: "$productDetails",
                    as: "pd",
                    cond: {$eq: ["$$pd._id", "$$p.product"]},
                  },
                }, 0,],
              },
            },
          },
        },
      },
    },
    // 8️⃣ On nettoie
    {
      $project: {
        productDetails: 0,
      },
    },
  ]) as unknown as StockEntryAggregationResult[]

  return entries.map(entry => ({
    id: entry._id,
    hour: new Date(new Date(date).setHours(entry._id, 0, 0, 0)),
    products: entry.products.map(p => {
      const quantity = p.quantity

      const product = shopProducts.find(sp => sp._id.toString() === p.product._id.toString())

      return {
        _id: product ? product._id : p.product._id,
        order: product ? product.order : p.product.order,
        name: product ? product.name : p.product.name,
        bv: product ? product.bv : p.product.bv,
        price: product ? product.price : p.product.price,
        quantity,
      }
    })
  }))
}
