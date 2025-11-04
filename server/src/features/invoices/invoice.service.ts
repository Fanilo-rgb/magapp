import {holderType, itemType, paymentType} from "./types";
import {addDistributor, verifyDistributor} from "../distributors/distributor.service";
import ClientModel, {ClientDocument} from "../clients/client.model";
import {createError} from "../../shared/utils/function";
import {BAD_REQUEST, NOT_FOUND} from "../../constants/http";
import {DistributorDocument} from "../distributors/distributor.model";

type ownerType = { owner: ClientDocument , type: "Client" } | { owner: DistributorDocument, type: "Distributor" }

type handleOwnerType = (holder: holderType, shopId: string) => Promise<ownerType>

export const handleOwner: handleOwnerType = async (holder, shopId) => {

  if (holder.type === "Client" && !holder._id) {
    const newClient = new ClientModel({
      name: holder.fullname,
      shop: shopId,
    })
    await newClient.save()
    return {
      owner: newClient as ClientDocument,
      type: "Client"
    }
  }

  if (holder.type === "Client") {
    const client: ClientDocument | null = await ClientModel.findById(holder._id)

    if (!client) throw createError("Client not found", NOT_FOUND)

    return {
      owner: client,
      type: "Client"
    }
  }

  if (!holder.numberCard) throw createError("A number card is required", BAD_REQUEST)

  const distributor = await verifyDistributor(holder.numberCard)

  if (!distributor) {
    const numberCard = holder.numberCard
    const name = holder.fullname.split(" ")[0]
    const surname = holder.fullname.slice(1).trim() === "" ? name : holder.fullname.slice(1)
    const nationality = "malagasy"

    const newDistributor = await addDistributor({numberCard, name, surname, nationality}, shopId)

    return {
      owner: newDistributor,
      type: "Distributor"
    }
  }

  return {
    owner: distributor,
    type: "Distributor"
  }

}

export const handleNewSale = async (shopId: string , holder: ownerType, products: itemType[], payments: paymentType[], date: Date) => {
  const ownerId = holder.owner._id
  const ownerType = holder.type

  // create the invoice

  // create the sales attached to the invoice

  // create the payment
}