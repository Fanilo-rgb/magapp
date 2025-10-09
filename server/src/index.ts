import "dotenv/config";

import express from 'express';
import cors from 'cors';

import { NODE_ENV, PORT } from "./constants/env"
import connectToDatabase from "./config/db";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "Hello, World!" });
})

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`);
  await connectToDatabase()
})
