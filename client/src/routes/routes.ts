import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layouts/RootLayout.tsx";
import MainPage from "../pages/MainPage.tsx";
import ProductPage from "../features/products/ProductPage.tsx";
import SalesPage from "../features/sales/SalesPage.tsx";

const router = createBrowserRouter([
  {
    path: "/", Component: RootLayout,
    children: [
      { index: true, Component: MainPage },
      { path: "products", Component: ProductPage },
      { path: "sales", Component: SalesPage },
    ]
  }
])

export default router