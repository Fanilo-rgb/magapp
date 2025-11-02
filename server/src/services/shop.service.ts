import ShopModel, {ShopDocument} from "../models/shop.model";
import {createError} from "../utils/function";
import {BAD_REQUEST} from "../constants/http";
import {findUser} from "./user.service";

export const create_shop = async (shopName: string, userId: string) => {

  const existing = await ShopModel.exists({ name: shopName })
  if (existing) throw createError("A shop with this name already exist", BAD_REQUEST)

  const user = await findUser(userId)

  if (user.role !== "admin") {
    user.role = "shop_owner"
    await user.save()
  }

  const newShop: ShopDocument = await ShopModel.create({ name: shopName, owner: userId })

  return {
    owner: user,
    shop: newShop
  }
}