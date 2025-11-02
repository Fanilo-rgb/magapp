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
import shopRoutes from "./features/shops/shop.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN
  })
)

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/shops", shopRoutes)

app.use("/api/v1/products", productRouter)
app.use("/api/v1/distributors", distributorRouter)

app.get("/", (req, res, next) => {
  return res.status(OK).send({
    success: true,
    message: "healthy"
  })
})

app.use(errorHandler)

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`);
  await connectToDatabase()
})
