import React from 'react'
import type {LucideIcon} from "lucide-react";

type variant = "primary" | "secondary" | "red" | "basic"

type Props = React.ComponentProps<"button"> & {
  children?: React.ReactNode
  variant?: variant
  icon?: LucideIcon
  iconPosition?: "left" | "right"
  text?: "sm" | "base"
  width?: "full" | "fit"
}

const Button = ({ children, icon: Icon, text = "base", width = "fit",iconPosition = "left", variant = "basic", ...props }: Props) => {

  const textSize: string = text === "base" ? "" : "text-xs"

  const widthStyle: string = width === "fit" ? "" : "w-full justify-center"

  const baseStyle = "flex gap-2 items-center py-1 px-2 rounded-lg transition"

  const variants: Record<string, string> = {
    basic: "text-gray-600 bg-transparent hover:bg-black/10 hover:text-gray-700",
    primary: "bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700",
    secondary: "bg-slate-700 text-white hover:bg-slate-800",
    red: "bg-red-50 text-red-500 hover:text-red-600 hover:bg-red-200"
  }

  return (
    <button className={`${baseStyle} ${textSize} ${variants[variant]} ${widthStyle}`} {...props}>
      {Icon && iconPosition === "left" && <Icon size={16} />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="ml-auto" size={16} />}
    </button>
  )

}
export default Button
