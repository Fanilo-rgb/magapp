import Button from "../../../shared/components/buttons/Button.tsx";
import {SidebarClose} from "lucide-react";
import {useSidebarStore} from "../store/sidebarStore.ts";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "../../../shared/hooks/useMediaQuery.ts";

const Sidebar = () => {

  const navigate = useNavigate()

  const closeSidebar = useSidebarStore((state) => state.closeSidebar)

  const isMid = useMediaQuery("md", "up")

  const handleClick = (link: string) => {
    navigate(link)

    if (!isMid) {
      closeSidebar()
    }
  }

  return (
    <div className="z-20 fixed inset-0 flex md:relative">
      <div className="relative bg-white/10 backdrop-blur-md w-2xs p-2 md:px-10 flex flex-col gap-2">
        <div className="flex md:hidden h-10 items-center justify-between gap-2">
          <div>Info</div>
          <div className="">
            <Button onClick={closeSidebar} icon={SidebarClose}/>
          </div>
        </div>

        <div className="flex-1 overflow-auto text-xs">
          <div
            onClick={() => handleClick("/")}
            className="p-2 bg-transparent hover:bg-black/10 rounded-lg cursor-pointer transition font-semibold text-gray-600"
          >
            Main Page
          </div>
          <div
            onClick={() => handleClick("/products")}
            className="p-2 bg-transparent hover:bg-black/10 rounded-lg cursor-pointer transition font-semibold text-gray-600"
          >
            Products
          </div>
        </div>

      </div>

      <div onClick={closeSidebar} className="flex-1 bg-black/40"/>
    </div>
  )
}
export default Sidebar
