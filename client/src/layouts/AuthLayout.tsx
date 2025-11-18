import pink from "../assets/svg/pink.svg"
import yellow from "../assets/svg/yellow.svg"
import orange from "../assets/svg/orange.svg"
import purple from "../assets/svg/purple.svg"
import blue from "../assets/svg/blue.svg"
import green from "../assets/svg/green.svg"

import {Outlet} from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative flex justify-center h-screen w-screen overflow-hidden bg-green-50">
      <div className="relative bottom-0 min-w-[1200px] h-full scale-70 select-none z-0">
        <img className="absolute -bottom-[300px] -left-[400px]" src={orange} alt="Orange svg" />
        <img className="absolute -left-[100px] bottom-[100px]" src={yellow} alt="Yellow svg" />
        <img className="absolute left-[170px] bottom-[150px]" src={pink} alt="Pink svg" />
        <img className="absolute left-[220px] -bottom-[100px]" src={purple} alt="Purple svg" />
        <img className="absolute left-[450px] -bottom-[380px]" src={blue} alt="Blue svg" />
        <img className="absolute left-[840px] bottom-[150px]" src={green} alt="Green svg" />
      </div>
      <div className="fixed bg-white/20 top-0 bottom-0 left-0 right-0 backdrop-blur-[100px] z-1"></div>

      <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10">
        <Outlet/>
      </div>
    </div>
  )
}
export default AuthLayout
