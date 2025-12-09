import {useState} from "react";
import {useProductStore} from "../store/productStore.ts";
import type {Product, ProductType} from "../type.ts";
import type {Label} from "../../../shared/types/types.ts";

export const useProduct = () => {

  const productStore = useProductStore()
  const products = useProductStore(state => state.products)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const findProduct = (productId: string)=> {
    const product = products.find(product => product._id === productId)
    if (!product) {
      setError("Product not found")
      throw new Error("Product not found")
    }

    return product
  }

  const fetchProducts = () => {
    try {
      setIsLoading(true)
      setError("")

      const fakeProduct: Product[] = [
        { _id: "1", name: "Kuding", bv: 12, price: 43200, order:1, type: "tea" },
        { _id: "2", name: "Cordyceps", bv: 20, price: 72000, order:2, type: "capsule" },
        { _id: "3", name: "Blueberry Juice", bv: 12, price: 43200, order:3, type: "powder" },
      ]

      productStore.setProducts(fakeProduct)
    } catch (e: any) {
      const message =
        e?.response?.data?.error ||
        e?.message ||
        "An unexpected error occurred.";

      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const addProduct = (name: string, bv: number, type: string, price: number | null) => {
    try {
      setIsLoading(true)
      setError("")
      if(!name || !bv || !type) {
        setError("All field are required")
        return
      }

      if (isNaN(bv)) {
        setError("The bv nust be a number")
        return
      }

      const label = getLabel().find(label => label.value === type)

      if (!label) {
        setError("Wrong product type")
        return
      }

      // UI update
      const productsLength = products.length
      const newId = (productsLength + 1).toString()
      const newPrice = price ?? bv * 3600
      const newOrder = productsLength + 1

      const newProduct: Product = { _id: newId, name, bv, type: label.value as ProductType, order: newOrder, price: newPrice}

      // here we put the endpoint to send the data

      productStore.addProduct(newProduct)
    } catch (e: any) {
      const message =
        e?.response?.data?.error ||
        e?.message ||
        "An unexpected error occurred.";

      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const removeProduct = (productId: string) => {
    try {
      // here we put the endpoint to send the data

      productStore.removeProduct(productId)
    } catch (e: any) {
      const message =
        e?.response?.data?.error ||
        e?.message ||
        "An unexpected error occurred.";

      setError(message)
    }
  }

  const updateProduct = (productId: string, name?: string, bv?: number, type?: ProductType, price?: number) => {
    try {
      setIsLoading(true)
      setError("")
      const product = findProduct(productId)

      const newData = {
        ...product,
        name: name ?? product.name,
        type: type ?? product.type,
        price: price ?? product.price,
        bv: bv ?? product.bv
      }

      // here we put the endpoint to send the data

      productStore.updateProduct(newData)
    } catch (e: any) {
      const message =
        e?.response?.data?.error ||
        e?.message ||
        "An unexpected error occurred.";

      setError(message)
    } finally {
      setIsLoading(false)
    }

  }

  const getProductDetails = (productId: string | null) => {

    try {
      setError("")

      if (!productId) throw new Error("No product id")
      // here we fetch the other details about the product

      const product = findProduct(productId)

      if (!product) throw new Error("Product not found")

      return product

    } catch (e: any) {
      const message =
        e?.response?.data?.error ||
        e?.message ||
        "An unexpected error occurred.";

      setError(message)
    }

  }

  const getLabel = (value?: string) => {
    const productLabels: Label[] = [
      { value: "tea", placeholder: "Thé", color: "green" },
      { value: "capsule", placeholder: "Gélule", color: "blue" },
      { value: "powder", placeholder: "Poudre", color: "yellow" },
      { value: "plaster", placeholder: "Plâtre", color: "purple" },
      { value: "compressed", placeholder: "Comprimé", color: "red" },
      { value: "pill", placeholder: "Pilule", color: "pink" },
      { value: "candy", placeholder: "Bonbons", color: "orange" },
      { value: "cosmetic", placeholder: "cosmétique", color: "blue" }
    ]

    const label = productLabels.find(l => l.value === value)

    if (!label || !value) return productLabels
    else return [label]
  }

  return { products, fetchProducts, addProduct, removeProduct, updateProduct, getProductDetails, getLabel, isLoading, error }
}

export default useProduct
