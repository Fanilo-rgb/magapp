import Button from "../../../shared/components/buttons/Button.tsx";
import {SidebarClose} from "lucide-react";
import {useSidebarStore} from "../store/sidebarStore.ts";

type HeadProps = {
  title: string
}

const Head = ({ title }: HeadProps) => {
  const closeSidebar = useSidebarStore((state) => state.closeSidebar)

  return (
    <div className="w-full flex md:hidden h-10 items-center justify-between gap-2">
      <div className="max-w-58 flex-1 bg-transparent hover:bg-black/10 p-1 rounded-lg cursor-pointer text-gray-500">
        <p className="uppercase truncate font-bold">
          {title}
        </p>
      </div>
      <div>
        <Button onClick={closeSidebar} icon={SidebarClose}/>
      </div>
    </div>
  )
}
export default Head
