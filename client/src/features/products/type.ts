export type Product = {
  _id: string
  type: ProductType
  name: string
  bv: number
  price: number
  order: number
}

export type ProductType = "tea" | "capsule" | "powder" | "plaster" | "compressed" | "pill" | "candy"