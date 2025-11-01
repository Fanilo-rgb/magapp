import DistributorModel, {DistributorDocument, DistributorType} from "../models/distributor.model";
import mongoose from "mongoose";

type addDistributorType = (distributor: DistributorType, shopId: string) => Promise<DistributorDocument>

export const addDistributor: addDistributorType = async (distributor, shopId) => {

  const existing: DistributorDocument | null = await DistributorModel.findOne({ numberCard: distributor.numberCard })

  const shopObjectId = new mongoose.Types.ObjectId(shopId)

  if (existing) {
    if (!existing.shops.includes(shopObjectId)) {
      existing.shops.push(shopObjectId)
      await existing.save()
    }

    return existing
  }

  const newDistributor = new DistributorModel({
    ...distributor,
    shops: [shopObjectId]
  })

  await newDistributor.save()

  return newDistributor
}

export const getDistributorsBetweenDates = async (startDate: Date, endDate: Date, shopId: string) => {
  const distributors: DistributorDocument[] = await DistributorModel.find({
    shops: shopId,
    createdAt: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ createdAt: -1 }).select("_id numberCard name surname")

  return distributors
}