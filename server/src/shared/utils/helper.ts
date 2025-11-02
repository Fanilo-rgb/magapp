import {BAD_REQUEST, UNAUTHORIZED} from "../../constants/http";
import { createError } from "./function";


export const validateShopOwnership = (req: any, shopId: string) => {
  if (!req.shop || req.shop._id.toString() !== shopId) {
    throw createError("Unauthorized: You don't own this shop", UNAUTHORIZED);
  }
};

export const validateRequiredFields = (data: any, fields: string[]) => {
  const missingFields = fields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    throw createError(`Missing required fields: ${missingFields.join(', ')}`, BAD_REQUEST);
  }
};
