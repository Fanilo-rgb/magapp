import {Outlet} from "react-router-dom";
import Header from "../shared/components/header/Header.tsx";
import UIContainer from "../shared/components/UIContainer.tsx";
import Sidebar from "../features/sidebar/components/Sidebar.tsx";
import {useSidebarStore} from "../features/sidebar/store/sidebarStore.ts";

const RootLayout = () => {
  const { isSidebarOpen } = useSidebarStore()

  return (
    <div className="h-screen w-screen overflow-hidden">

      <div className="h-full flex flex-col">

        <Header/>

        <div className="relative flex flex-1">
          {isSidebarOpen && <Sidebar/>}

          <div className="relative flex-1">
            <div className="absolute top-0 left-0 bottom-0 right-0 overflow-auto">
              <Outlet/>
            </div>
          </div>
        </div>

      </div>

      <UIContainer/>

    </div>
  )
}
export default RootLayout
