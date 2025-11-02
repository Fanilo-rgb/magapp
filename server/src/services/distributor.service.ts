import DistributorModel, {DistributorDocument, DistributorType} from "../models/distributor.model";
import mongoose from "mongoose";

type addDistributorType = (distributor: DistributorType, shopId: string) => Promise<DistributorDocument>

export const addDistributor: addDistributorType = async (distributor, shopId) => {

  const existing: DistributorDocument | null = await DistributorModel.findOne({ numberCard: distributor.numberCard })

  const shopObjectId = new mongoose.Types.ObjectId(shopId)

  if (existing) {
    if (distributor.name) existing.name = distributor.name
    if (distributor.surname) existing.surname = distributor.surname
    if (distributor.cin) existing.cin = distributor.cin
    if (distributor.phone) existing.phone = distributor.phone
    if (distributor.email) existing.email = distributor.email
    if (distributor.dateOfBirth) existing.dateOfBirth = new Date(distributor.dateOfBirth)
    if (distributor.gender) existing.gender = distributor.gender
    if (distributor.address) existing.address = distributor.address
    if (distributor.postalCode) existing.postalCode = distributor.postalCode
    if (distributor.upLine) existing.upLine = distributor.upLine
    if (distributor.sponsor) existing.sponsor = distributor.sponsor

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