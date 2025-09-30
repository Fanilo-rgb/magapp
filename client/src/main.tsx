import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './pages/MainPage.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", Component: MainPage
  }
])


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
