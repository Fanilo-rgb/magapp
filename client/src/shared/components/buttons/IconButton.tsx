import React from 'react'
import type {LucideIcon} from "lucide-react";

type variant = "primary" | "secondary" | "red"

type Props = React.ComponentProps<"button"> & {
  variant?: variant
  icon: LucideIcon
}

const IconButton = ({ icon: Icon, variant = "primary", ...props }: Props) => {
  const baseStyle = "p-1 rounded-lg transition"

  const variants: Record<variant, string> = {
    primary: "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100",
    secondary: "bg-slate-700 text-gray-50 hover:bg-slate-900",
    red: "bg-red-100 text-red-400 hover:text-red-600 hover:bg-red-200"
  }

  return (
    <button className={`${baseStyle} ${variants[variant]} `} {...props} >
      <Icon size={16} />
    </button>
  )
}
export default IconButton
