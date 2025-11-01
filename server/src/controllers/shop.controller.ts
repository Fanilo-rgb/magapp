import catchErrors from "../utils/catchErrors";
import ShopModel from "../models/shop.model";
import {createError} from "../utils/function";
import {BAD_REQUEST, CREATED, NOT_FOUND, OK} from "../constants/http";
import UserModel from "../models/user.model";

export const createShop = catchErrors(
  async (req, res) => {
    const { name } = req.body

    const existing = await ShopModel.exists({ name: name })

    if (existing) throw createError("A shop with this name already exist", BAD_REQUEST)

    const newShop = new ShopModel({ name: name, owner: req.user?._id })

    const owner = await UserModel.findById(req.user?._id)

    await newShop.save()

    return res.status(CREATED).send({
      success: true,
      message: "Shop created successfully",
      data: newShop
    })

  }
)

export const getAllShop = catchErrors(
  async (req, res) => {
    const shops = await ShopModel.find().select("-__v ")

    return res.status(OK).send({
      success: true,
      data: shops
    })
  }
)

export const getShopDetails = catchErrors(
  async (req, res) => {
    const id = req.params.id

    const exist = await ShopModel.exists({ _id: id })

    if (!exist) throw createError("Shop not found", NOT_FOUND)

    const shop = await ShopModel.findById(id)
      .select("-__v")
      .populate("owner", "_id name email")

    return res.status(OK).send({
      success: true,
      data: shop
    })
  }
)

