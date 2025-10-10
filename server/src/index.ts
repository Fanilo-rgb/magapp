import "dotenv/config";

import express from 'express';
import cors from 'cors';
import axios from 'axios';

import { NODE_ENV, PORT } from "./constants/env"
import connectToDatabase from "./config/db";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "Hello, World!" });
})

const fastapi = axios.create({
  baseURL: 'http://localhost:8000/',
})

app.get('/api/v1/products', async (req, res) => {
  const response = await fastapi.get('/products')

  if (!response) return res.status(500).send({ success: false, message: 'Error fetching products' })

  return res.status(200).send(response.data)
})

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`);
  await connectToDatabase()
})
