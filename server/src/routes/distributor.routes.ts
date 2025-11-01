import { Router } from 'express';
import {
  createDistributor, deleteDistributor,
  getDistributor,
  getDistributors, restoreDistributor, softDeleteDistributor,
  updateDistributor
} from "../controllers/distributor.controller";
import authorize, {protect} from "../middleware/auth.middleware";

const distributorRouter = Router();

distributorRouter.get("/", authorize, protect(["shop_owner"]), getDistributors)

distributorRouter.get("/:numberCard", authorize, protect(["shop_owner"]), getDistributor)

distributorRouter.post("/", authorize, protect(["shop_owner"]), createDistributor )

distributorRouter.put("/:id", updateDistributor)

distributorRouter.put("/:numberCard/delete", softDeleteDistributor)

distributorRouter.put("/:numberCard/restore", restoreDistributor)

distributorRouter.delete("/:id", deleteDistributor)

export default distributorRouter;
