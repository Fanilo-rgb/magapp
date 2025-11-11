import catchErrors from "../../shared/utils/catchErrors";
import {verifyShopId} from "../../shared/utils/helper";
import {getShopSales} from "./sale.service";
import {OK} from "../../constants/http";

export const getSales = catchErrors(async (req, res) => {
  const shopId = verifyShopId(req.shop?._id)

  const { d } = req.query

  const date = d === "thisMonth" ? "thisMonth" : d === "today" ? "today" : undefined

  const sales = await getShopSales(shopId, date)

  return res.status(OK).send({
    success: true,
    data: sales
  })
})