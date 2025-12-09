import "dotenv/config";

import express from 'express';
import cors from 'cors';

import {APP_ORIGIN, NODE_ENV, PORT} from "./constants/env"
import connectToDatabase from "./config/db";

import errorHandler from "./shared/middleware/errorHandler";
import {OK} from "./constants/http";

import productRouter from "./features/products/product.routes"
import distributorRouter from "./features/distributors/distributor.routes";
import userRouter from "./features/users/user.routes";
import authRouter from "./features/auth/auth.routes";
import shopRouter from "./features/shops/shopRouter";
import inventoryRouter from "./features/inventory/inventory.routes";
import invoiceRouter from "./features/invoices/invoice.routes";
import saleRouter from "./features/sales/sale.routes";
import axios from "axios";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: APP_ORIGIN
  })
)

app.use("/api/v1/sales", saleRouter)
app.use("/api/v1/invoices", invoiceRouter)
app.use("/api/v1/inventory", inventoryRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/shops", shopRouter)

app.use("/api/v1/products", productRouter)
app.use("/api/v1/distributors", distributorRouter)

app.get("/", (req, res, next) => {
  return res.status(OK).send({
    success: true,
    message: "healthy"
  })
})

app.post("/test-n8n", async (req, res) => {
  const response = await axios.post("http://localhost:5678/webhook-test/test-webhook", {
    user: "fanilo",
    action: "test"
  });
  res.send("Webhook called !");
});

app.use(errorHandler)

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`);
  await connectToDatabase()
})
