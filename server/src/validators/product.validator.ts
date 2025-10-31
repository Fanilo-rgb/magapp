// validators/product.validator.ts
import { z } from 'zod';

export const updateShopProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be positive")
});

export const updateGlobalProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bv: z.number().positive("BV must be positive"),
  price: z.number().nullable(),
  order: z.number().int().positive("Order must be positive")
});