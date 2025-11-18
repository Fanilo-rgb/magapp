import {useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {useSidebarStore} from "../store/sidebarStore.ts";
import {useMediaQuery} from "../../../shared/hooks/useMediaQuery.ts";

type Props = {
  link: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  placeholder: string
}

const StaticLink = ({link, icon: Icon, placeholder}: Props) => {
  const location = useLocation()
  const navigate = useNavigate()

  const active = location.pathname === link

  const closeSidebar = useSidebarStore((state) => state.closeSidebar)

  const isMid = useMediaQuery("md", "up")

  const handleClick = () => {
    navigate(link)

    if (!isMid) {
      closeSidebar()
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`${active ? "bg-cyan-100/50 hover:bg-cyan-200/50" : "bg-transparent hover:bg-black/10"} flex gap-2 p-2 rounded-xl items-center transition cursor-pointer`}
    >
      <Icon className={`${active ? "text-cyan-800" : "text-gray-500"} w-5 min-w-5 `}/>
      <p className={`font-semibold ${active ? "text-cyan-700" : "text-gray-600"} truncate transition`}>{placeholder}</p>
    </div>
  )
}
export default StaticLink
