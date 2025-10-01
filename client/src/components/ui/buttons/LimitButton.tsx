import React, {useState} from 'react'
import {ChevronDown} from "lucide-react";

type variant = "close" | "open"

type Props = React.ComponentProps<"button"> & {
  variant?: variant
}

const LimitButton = ({ variant = "close", ...props }: Props) => {
  const [isHover, setIsHover] = useState(false)

  const containerBaseStyle = "absolute grid place-items-center w-full h-14 bg-gradient-to-b from-transparent to-white"

  const containerVariants: Record<string, string> = {
    open: "bottom-2",
    close: "-bottom-10",
  }

  const buttonBaseStyle = "bg-white/50 border-2 border-transparent hover:border-gray-300 p-1 rounded-full text-gray-700 transition"

  const buttonVariants: Record<string, string> = {
    open: "",
    close: "rotate-180"
  }

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`${containerBaseStyle} ${containerVariants[variant]}`}
    >
      <button
        { ...props }
        className={`${buttonBaseStyle} ${buttonVariants[variant]} ${isHover ? "opacity-100" : "md:opacity-0"} transition duration-300`}
      >
        <ChevronDown/>
      </button>
    </div>
  )
}
export default LimitButton
