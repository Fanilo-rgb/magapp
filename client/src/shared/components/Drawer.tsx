import type {ContainerType} from "../types/types.ts";

import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useRef} from "react";

import {ChevronsRight} from "lucide-react";

import Button from "./buttons/Button.tsx";

type DrawerProps = ContainerType

const Drawer = ({children, onClose, isOpen}: DrawerProps) => {
  const [searchParams] = useSearchParams()
  const type = searchParams.get("type")
  const navigate = useNavigate()

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (type === "drawer") {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [type, navigate]);

  if (!isOpen) return null

  return (
    <div className="fixed z-20 w-screen h-screen bg-white/10 left-0 top-0 ">
      <div
        ref={dropdownRef}
        className="absolute right-0 top-0 bottom-0 flex flex-col w-full sm:w-md md:w-2xl bg-white/10 backdrop-blur-md shadow-2xl overflow-auto"
      >
        <div className="z-10 sticky top-0 flex items-center justify-between bg-gradient-to-b from-white to-transparent backdrop-blur-sm py-1 px-2 min-h-10">
          <div className="flex gap-2">
            <Button
              onClick={onClose}
              icon={ChevronsRight}
            />
          </div>
          <div>
            item 2
          </div>
        </div>
        <div className="relative">
          <div className="relative px-12 h-fit w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Drawer
