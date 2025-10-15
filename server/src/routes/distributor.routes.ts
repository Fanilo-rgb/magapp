import { Router } from 'express';
import {
  createDistributor, deleteDistributor,
  getDistributor,
  getDistributors, restoreDistributor, softDeleteDistributor,
  updateDistributor
} from "../controllers/distributor.controller";

const distributorRouter = Router();

distributorRouter.get("/", getDistributors)

distributorRouter.get("/:numberCard", getDistributor)

distributorRouter.post("/", createDistributor )

distributorRouter.put("/:id", updateDistributor)

distributorRouter.put("/:numberCard/delete", softDeleteDistributor)

distributorRouter.put("/:numberCard/restore", restoreDistributor)

distributorRouter.delete("/:id", deleteDistributor)

export default distributorRouter;
