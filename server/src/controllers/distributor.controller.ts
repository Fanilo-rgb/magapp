import catchErrors from "../utils/catchErrors";
import DistributorModel, {DistributorDocument} from "../models/distributor.model";
import {CREATED, OK} from "../constants/http";
import {createError} from "../global/function";

export const createDistributor = catchErrors(
  async (req, res) => {
    const distributor: DistributorDocument = req.body

    const existing = await DistributorModel.findOne({ numberCard: distributor.numberCard })
    if (existing) {
      return res.status(400).send({
        success: false,
        message: "A distributor with this numberCard already exists"
      })
    }

    const newDistributor = new DistributorModel(distributor)
    await newDistributor.save()
    return res.status(CREATED).send({
      success: true,
      message: "Distributor created successfully",
      data: newDistributor
    })

  }
)

export const getDistributors = catchErrors(
  async (req, res) => {

    const { d } = req.query

    if (d === "today") {
      const startOfDay = new Date()
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date()
      endOfDay.setHours(23, 59, 59, 999)

      const distributors = await DistributorModel.find({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }).sort({ createdAt: -1 }).select("_id offlineId numberCard name surname")

      return res.status(200).send({
        success: true,
        data: distributors
      })
    }

    if (d === "thisMonth") {
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999)

      const distributors = await DistributorModel.find({
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      }).sort({ createdAt: -1 }).select("_id offlineId numberCard name surname")

      return res.status(200).send({
        success: true,
        data: distributors
      })
    }

    const distributors = await DistributorModel.find().sort({ createdAt: -1 }).select("_id offlineId numberCard name surname")
    return res.status(200).send({
      success: true,
      data: distributors
    })
  }
)

export const getDistributor = catchErrors(
  async (req, res) => {
    const { numberCard } = req.params
    const existing = await DistributorModel.exists({ numberCard })

    if (!existing) throw createError("Distributor not found or doesn't exist", 404)

    const distributor = await DistributorModel.findOne({ numberCard: numberCard })
      .select("-__v")
      .populate("upLine", "_id offlineId numberCard name surname")
      .populate("sponsor", "_id offlineId numberCard name surname")

    return res.status(200).send({
      success: true,
      data: distributor
    })
  }
)

export const updateDistributor = catchErrors(
  async (req, res) => {
    const {id} = req.params
    const updates: DistributorDocument = req.body

    const distributor: DistributorDocument | null = await DistributorModel.findOne({ _id: id })

    if (!distributor) throw createError("Distributor not found or doesn't exist", 404)

    if (!updates.numberCard || !updates.name) throw createError("numberCard and name are required fields", 400)

    //if exisisting card we can't update

    const existing: DistributorDocument | null = await DistributorModel.findOne({ numberCard: updates.numberCard })

    if (existing) {
      const info = existing.getMinimumInfo()
      throw createError(`A distributor with this numberCard already exists: ${info}`, 400)
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

    return res.status(200).send({
      success: true,
      message: "Distributor updated successfully",
      data: distributor
    })

  }
)

export const softDeleteDistributor = catchErrors(
  async (req, res) => {
    const {numberCard} = req.params

    const distributor: DistributorDocument | null = await DistributorModel.findOne({ numberCard })

    if (!distributor) throw createError("Distributor not found or doesn't exist", 404)

    await distributor.softDelete()

    return res.status(OK).send({
      success: true,
      message: "Distributor moved to trash"
    })
  }
)

export const restoreDistributor = catchErrors(
  async (req, res) => {
    const {numberCard} = req.params

    const distributor: DistributorDocument | null = await DistributorModel.findOne({ numberCard })

    if (!distributor) throw createError("Distributor not found or doesn't exist", 404)

    await distributor.restore()

    return res.status(OK).send({
      success: true,
      message: "Distributor restored"
    })
  }
)

export const deleteDistributor = catchErrors(
  async (req, res) => {
    const {id} = req.params

    const distributor: DistributorDocument | null = await DistributorModel.findById(id)

    if (!distributor) throw createError("Distributor not found or doesn't exist", 404)

    await distributor.deleteOne()

    return res.status(200).send({
      success: true,
      message: "Distributor deleted "
    })
  }
)
