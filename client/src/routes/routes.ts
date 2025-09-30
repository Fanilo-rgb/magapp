import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layouts/RootLayout.tsx";
import MainPage from "../pages/MainPage.tsx";

const router = createBrowserRouter([
  {
    path: "/", Component: RootLayout,
    children: [
      { index: true, Component: MainPage }
    ]
  }
])

export default router