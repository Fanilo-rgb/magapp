import catchErrors from "../utils/catchErrors";
import ShopModel from "../models/shop.model";
import {createError} from "../utils/function";
import {CREATED, NOT_FOUND, OK} from "../constants/http";
import {create_shop} from "../services/shop.service";
import {validateShopOwnership} from "../utils/helper";

export const createShop = catchErrors(
  async (req, res) => {
    const { name } = req.body
    const userId = req.user?._id

    if (!userId) throw createError("User not found", NOT_FOUND)

    const newShopData = await create_shop(name, userId)

    return res.status(CREATED).send({
      success: true,
      message: "Shop created successfully",
      data: newShopData
    })

  }
)

export const getAllShop = catchErrors(
  async (req, res) => {
    const shops = await ShopModel.find().select("_id name status")

    return res.status(OK).send({
      success: true,
      data: shops
    })
  }
)

export const getShopDetails = catchErrors(
  async (req, res) => {
    const id = req.params.id

    if (req.user?.role !== "admin") {
      validateShopOwnership(req, id)
    }

    const shop = await ShopModel.findById(id)
      .select("-__v")
      .populate("owner", "_id name email")

    return res.status(OK).send({
      success: true,
      data: shop
    })
  }
)

