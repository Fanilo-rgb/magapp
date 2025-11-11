import catchErrors from "../../shared/utils/catchErrors";
import {getShopInventory, getShopStockEntry, updateShopInventory} from "./inventory.service";
import {BAD_REQUEST, OK} from "../../constants/http";
import {InventoryUpdateType} from "./inventory.type";
import mongoose from "mongoose";
import {createError} from "../../shared/utils/function";
import {formatDateFr} from "../../shared/utils/dateUtils";
import {verifyShopId} from "../../shared/utils/helper";

export const getInventory = catchErrors(async (req, res) => {
  const shopId = verifyShopId(req.shop?._id)

  const inventory = await getShopInventory(shopId)

  return res.status(OK).send({
    success: true,
    message: "Inventory retrieved successfully",
    data: inventory
  })

})

export const updateInventory = catchErrors(async (req, res, next) => {
  const updates: InventoryUpdateType[] = req.body
  const shopId = verifyShopId(req.shop?._id)

  updates.forEach(update => {
    if (isNaN(update.quantity)) throw new Error("The quantity must be a number")
    if (update.quantity <= 0) throw new Error("The quantity must be greater than 0")
  })

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    await updateShopInventory(shopId, updates, session)
    await session.commitTransaction()
    await session.endSession()

    const newInventory = await getShopInventory(shopId)

    return res.status(OK).send({
      success: true,
      message: "Inventory updated successfully",
      data: newInventory
    })
  } catch (e) {
    await session.abortTransaction()
    await session.endSession()
    next(e)
  }

})

export const getStockEntry = catchErrors(async (req, res) => {
  const shopId = verifyShopId(req.shop?._id)
  const { date } = req.body

  if (!date || isNaN(new Date(date).getTime())) throw createError("The date must be a valid date", BAD_REQUEST)

  const stockEntry = await getShopStockEntry(shopId, date)

  return res.status(OK).send({
    success: true,
    message: `Stock entry for ${formatDateFr(new Date(date))} retrieved successfully`,
    data: stockEntry
  })

})