import { create } from "zustand"
import type {Product} from "../type.ts";



type ProductStore = {
  products: Product[]
  setProducts: (products: Product[]) => void
  addProduct: (newProduct: Product) => void
  removeProduct: (productId: string) => void
  updateProduct: (newProduct: Product) => void
  getProduct: (productId: string) => Product | undefined
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],

  setProducts: (products) => set({ products }),

  addProduct: (newProduct) => set(state => ({
    products: [...state.products, newProduct]
  })),

  removeProduct: (productId) => set(state => ({
    products: state.products.filter(product => product._id === productId)
  })),

  updateProduct: (newProduct) => set(state => ({
    products: state.products.map(product => newProduct._id === product._id
      ? { ...product, name: newProduct.name, bv: newProduct.bv, price: newProduct.price, order: newProduct.order }
      : { ...product }
    )
  })),

  getProduct: (productId) => get().products.find(product => product._id === productId)
}))
