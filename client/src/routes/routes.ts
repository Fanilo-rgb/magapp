import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layouts/RootLayout.tsx";
import MainPage from "../pages/MainPage.tsx";
import ProductPage from "../pages/ProductPage.tsx";

const router = createBrowserRouter([
  {
    path: "/", Component: RootLayout,
    children: [
      { index: true, Component: MainPage },
      { path: "products", Component: ProductPage }
    ]
  }
])

export default router