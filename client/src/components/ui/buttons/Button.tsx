import React from 'react'
import type {LucideIcon} from "lucide-react";

type variant = "primary" | "secondary" | "red" | "basic"

type Props = React.ComponentProps<"button"> & {
  children?: React.ReactNode
  variant?: variant
  icon?: LucideIcon
}

const Button = ({ children, icon: Icon, variant = "basic", ...props }: Props) => {

  const baseStyle = "flex gap-2 items-center py-1 px-2 rounded-lg transition"

  const variants: Record<string, string> = {
    basic: "text-gray-600 bg-transparent hover:bg-black/10 hover:text-gray-700",
    primary: "bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700",
    secondary: "bg-slate-700 text-white hover:bg-slate-800",
    red: "bg-red-50 text-red-500 hover:text-red-600 hover:bg-red-200"
  }

  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  )

}
export default Button
