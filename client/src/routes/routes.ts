import {createBrowserRouter, redirect} from "react-router-dom";

import RootLayout from "../layouts/RootLayout.tsx";
import MainPage from "../pages/MainPage.tsx";
import ProductPage from "../features/products/ProductPage.tsx";
import SalesPage from "../features/sales/SalesPage.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";
import SignInPage from "../features/auth/SignInPage.tsx";
import SignUpPage from "../features/auth/SignUpPage.tsx";

import {useUserInfoStore} from "../shared/store/userInfoStore.ts";

// @ts-ignore
const requireAuth = async ({ request }) => {

  const userInformation = useUserInfoStore.getState().information

  if (!userInformation || !userInformation.user) {
    const from = new URL(request.url).pathname
    return redirect(`/auth/sign-in?from=${from}`)
  }

  if (!userInformation.token) {
    const from = new URL(request.url).pathname
    return redirect(`/auth/sign-in?from=${from}&email=${userInformation.user.email}`)
  }

  return null
}

const router = createBrowserRouter([
  {
    path: "/", Component: RootLayout,
    loader: requireAuth,
    children: [
      { index: true, Component: MainPage },
      { path: "products", Component: ProductPage },
      { path: "sales", Component: SalesPage },
    ]
  },
  {
    path: "/auth", Component: AuthLayout,
    children: [
      { path: "sign-in", Component: SignInPage },
      { path: "sign-up", Component: SignUpPage }
    ]
  }
])

export default router