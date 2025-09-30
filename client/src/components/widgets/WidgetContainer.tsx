import React, {type JSX} from 'react'
import {type LucideIcon} from "lucide-react";

type Props = {
  children : React.ReactNode
  title: string
  icon: LucideIcon
  header?: JSX.Element
}

const WidgetContainer = ({children, title, icon: Icon, header: Element}: Props) => {
  return (
    <div className="widget">
      <div className={`flex items-center justify-between ${Element ? "h-8" : "mb-2"}`}>
        <div className="text-gray-500 text-xs flex gap-2 px-2">
          <Icon size={14}/>
          <p>{title}</p>
        </div>
        <div className="px-2">
          {Element && Element}
        </div>
      </div>
      {children}
    </div>
  )
}
export default WidgetContainer
