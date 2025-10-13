import "dotenv/config";

import express from 'express';
import cors from 'cors';

import {APP_ORIGIN, NODE_ENV, PORT} from "./constants/env"
import connectToDatabase from "./config/db";

import productRouter from "./routes/product.routes"
import errorHandler from "./middleware/errorHandler";
import {OK} from "./constants/http";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN
  })
);

app.use("api/v1/products", productRouter)

app.get("/", (req, res, next) => {
  return res.status(OK).send({
    success: true,
    message: "API is running..."
  })
})

app.use(errorHandler)

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`);
  await connectToDatabase()
})
