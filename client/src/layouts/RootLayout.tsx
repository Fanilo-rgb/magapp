import {Outlet} from "react-router-dom";
import Header from "../shared/components/header/Header.tsx";
import UIContainer from "../shared/components/UIContainer.tsx";
import Sidebar from "../features/sidebar/components/Sidebar.tsx";
import {useSidebarStore} from "../features/sidebar/store/sidebarStore.ts";
// import orange from "../assets/svg/orange.svg";
// import yellow from "../assets/svg/yellow.svg";
// import pink from "../assets/svg/pink.svg";
// import purple from "../assets/svg/purple.svg";
// import blue from "../assets/svg/blue.svg";
// import green from "../assets/svg/green.svg";

const RootLayout = () => {
  const { isSidebarOpen } = useSidebarStore()

  return (
    <div className="relative h-screen w-screen overflow-hidden">

      {/*<div className="fixed h-full w-full -z-10">*/}
      {/*  <div className="relative top-1/2 min-w-[1200px] h-full scale-70 select-none z-0">*/}
      {/*    <img className="absolute -bottom-[300px] -left-[400px]" src={orange} alt="Orange svg" />*/}
      {/*    <img className="absolute -left-[100px] bottom-[100px]" src={yellow} alt="Yellow svg" />*/}
      {/*    <img className="absolute left-[170px] bottom-[150px]" src={pink} alt="Pink svg" />*/}
      {/*    <img className="absolute left-[220px] -bottom-[100px]" src={purple} alt="Purple svg" />*/}
      {/*    <img className="absolute left-[450px] -bottom-[380px]" src={blue} alt="Blue svg" />*/}
      {/*    <img className="absolute left-[840px] bottom-[150px]" src={green} alt="Green svg" />*/}
      {/*  </div>*/}
      {/*  <div className="fixed bg-white/20 top-0 bottom-0 left-0 right-0 backdrop-blur-[150px] z-1"></div>*/}
      {/*</div>*/}

      <div className="h-full flex flex-col z-10">

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
