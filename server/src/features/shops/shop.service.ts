import ShopModel, {ShopDocument} from "./shop.model";
import {createError} from "../../shared/utils/function";
import {BAD_REQUEST} from "../../constants/http";
import {findUser} from "../users/user.service";

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

export const getUserShops = async (userId: string) => {
  const shops: ShopDocument[] = await ShopModel.find({ owner: userId })
    .select("-__v -owner")
  return shops
}