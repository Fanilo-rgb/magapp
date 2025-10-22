import {UserDocument} from "../models/user.model";
import {ShopDocument} from "../models/shop.model";

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument,
      shop?: ShopDocument
    }
  }
}