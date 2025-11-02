import {UserDocument} from "../../features/users/user.model";
import {ShopDocument} from "../../features/shops/shop.model";

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument,
      shop?: ShopDocument
    }
  }
}