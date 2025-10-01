import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useRef} from "react";
import {ChevronsRight} from "lucide-react";
import Button from "../../buttons/Button.tsx";
import Contents from "../Contents.tsx";

const Drawer = () => {
  const [searchParams] = useSearchParams()
  const container = searchParams.get("container")
  const navigate = useNavigate()

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const close = () => {
    navigate("?", { replace: true })
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        close()
      }
    }

    if (container === "drawer") {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [container, navigate]);

  if (container !== "drawer") return null

  return (
    <div
      ref={dropdownRef}
      className="fixed flex flex-col z-20 right-0 top-0 bottom-0 w-full sm:w-md md:w-2xl bg-white/10 backdrop-blur-md shadow-2xl overflow-auto"
    >
      <div className="z-10 sticky top-0 flex items-center justify-between bg-gradient-to-b from-white to-transparent backdrop-blur-sm py-1 px-2 min-h-10">
        <div className="flex gap-2">
          <Button
            onClick={close}
            icon={ChevronsRight}
          />
        </div>
        <div>
          item 2
        </div>
      </div>
      <div className="relative">
        <Contents/>
      </div>
    </div>
  )
}
export default Drawer
