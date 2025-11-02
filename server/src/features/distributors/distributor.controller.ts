import catchErrors from "../../shared/utils/catchErrors";
import DistributorModel, {DistributorDocument, DistributorType} from "./distributor.model";
import {BAD_REQUEST, CREATED, NOT_FOUND, OK} from "../../constants/http";
import {createError} from "../../shared/utils/function";
import {validateRequiredFields} from "../../shared/utils/helper";
import {addDistributor, getDistributorsBetweenDates} from "./distributor.service";
import ShopModel, {ShopDocument} from "../shops/shop.model";

export const verifyDistributor = catchErrors(async (req, res) => {
  const {numberCard} = req.body

  const distributor = await DistributorModel.findOne({ numberCard })
    .select("-__v -shops")

  if (distributor) {
    return res.status(OK).send({
      success: true,
      data: distributor
    })
  }

  return res.status(NOT_FOUND).send({
    success: false,
    message: "Distributor not found"
  })
})

export const createDistributor = catchErrors(async (req, res) => {
  const distributor: DistributorType = req.body

  const shop: ShopDocument | null = await ShopModel.findById(req.shop?._id)

  if (!shop) throw createError("Shop not found", NOT_FOUND)

  validateRequiredFields(distributor, ["numberCard", "name", "surname"])

  const newDistributor = await addDistributor(distributor, shop._id)

  return res.status(CREATED).send({
    success: true,
    message: "Distributor created successfully",
    data: newDistributor
  })

})

export const getDistributors = catchErrors(async (req, res) => {
  const { d } = req.query

  const shopId = req.shop?._id
  if (!shopId) throw createError("Shop not found", NOT_FOUND)

  if (d === "today") {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    const distributors = await getDistributorsBetweenDates(startOfDay, endOfDay, shopId)

    return res.status(OK).send({
      success: true,
      data: distributors
    })
  }

  if (d === "thisMonth") {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999)

    const distributors = await getDistributorsBetweenDates(startOfMonth, endOfMonth, shopId)

    return res.status(OK).send({
      success: true,
      data: distributors
    })
  }

  const distributors = await DistributorModel.find({ shops: shopId })
    .sort({ createdAt: -1 })
    .select("_id offlineId numberCard name surname")

  return res.status(OK).send({
    success: true,
    data: distributors
  })
})

export const getDistributor = catchErrors(async (req, res) => {
  const { numberCard } = req.params
  const existing = await DistributorModel.exists({ numberCard })

  if (!existing) throw createError("Distributor not found or doesn't exist", NOT_FOUND)

  const distributor = await DistributorModel.findOne({ numberCard: numberCard })
    .select("-__v")
    .populate("upLine", "_id offlineId numberCard name surname")
    .populate("sponsor", "_id offlineId numberCard name surname")
    .populate("shops", "_id name")

  return res.status(OK).send({
    success: true,
    data: distributor
  })
})

export const updateDistributor = catchErrors(async (req, res) => {
  const {id} = req.params
  const updates: DistributorType = req.body
  const shopId = req.shop?._id

  if (!shopId) throw createError("Shop not found", NOT_FOUND)

  const distributor: DistributorDocument | null = await DistributorModel.findOne({
    _id: id,
    shops: shopId // Verify this shop has access to this distributor
  })

  if (!distributor) throw createError("Distributor not found or doesn't exist", NOT_FOUND)

  validateRequiredFields(updates, ["numberCard", "name", "surname"])

  const existing: DistributorDocument | null = await DistributorModel.findOne({ numberCard: updates.numberCard })

  if (existing && existing._id.toString() !== id) {
    const info = existing.getMinimumInfo()
    throw createError(`A distributor with this numberCard already exists: ${info}`, BAD_REQUEST)
  }

  distributor.numberCard = updates.numberCard
  distributor.name = updates.name
  distributor.surname = updates.surname
  distributor.nationality = updates.nationality
  distributor.dateOfBirth = updates.dateOfBirth
  distributor.gender = updates.gender
  distributor.phone = updates.phone
  distributor.cin = updates.cin
  distributor.email = updates.email
  distributor.address = updates.address
  distributor.postalCode = updates.postalCode
  distributor.upLine = updates.upLine
  distributor.sponsor = updates.sponsor
  await distributor.save()

  return res.status(OK).send({
    success: true,
    message: "Distributor updated successfully",
    data: distributor
  })

})

export const softDeleteDistributor = catchErrors(async (req, res) => {
  const {numberCard} = req.params
  const shopId = req.shop?._id

  if (!shopId) throw createError("Shop not found", NOT_FOUND)

  const distributor: DistributorDocument | null = await DistributorModel.findOne({
    numberCard,
    shops: shopId
  })

  if (!distributor) throw createError("Distributor not found or doesn't exist", NOT_FOUND)

  await distributor.softDelete()

  return res.status(OK).send({
    success: true,
    message: "Distributor moved to trash"
  })
})

export const restoreDistributor = catchErrors(async (req, res) => {
  const {numberCard} = req.params
  const shopId = req.shop?._id

  if (!shopId) throw createError("Shop not found", NOT_FOUND)

  const distributor: DistributorDocument | null = await DistributorModel.findOne({
    numberCard,
    shops: shopId
  })

  if (!distributor) throw createError("Distributor not found or doesn't exist", NOT_FOUND)

  await distributor.restore()

  return res.status(OK).send({
    success: true,
    message: "Distributor restored"
  })
})

export const deleteDistributor = catchErrors(async (req, res) => {
  const {id} = req.params
  const shopId = req.shop?._id

  if (!shopId) throw createError("Shop not found", NOT_FOUND)

  const distributor: DistributorDocument | null = await DistributorModel.findOne({
    _id: id,
    shops: shopId
  })

  if (!distributor) throw createError("Distributor not found or doesn't exist", NOT_FOUND)

  await distributor.deleteOne()

  return res.status(OK).send({
    success: true,
    message: "Distributor deleted "
  })
})
