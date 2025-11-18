import React, {type JSX} from 'react'
import {type LucideIcon, Plus} from "lucide-react";
import Button from "./buttons/Button.tsx";
import {useNavigate} from "react-router-dom";

type Props = {
  children : React.ReactNode
  title: string
  icon: LucideIcon
  header?: JSX.Element
  buttonLink?: string
}

const WidgetContainer = ({children, buttonLink,title, icon: Icon, header: Element}: Props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (buttonLink) navigate(buttonLink)
  }

  return (
    <div className="widget bg-white py-2 px-4 rounded-xl">
      <div className={`flex items-center justify-between ${Element ? "h-8 pb-2" : "mb-2"}`}>
        <div className="text-gray-500 text-xs flex gap-2 px-2">
          <Icon size={14}/>
          <p>{title}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="px-2">
            {Element && Element}
          </div>

          {buttonLink && (
            <Button
              onClick={handleClick}
              icon={Plus} variant="primary"
              text="sm"
            >
              Ajouter
            </Button>
          )}

        </div>
      </div>
      {children}
    </div>
  )
}
export default WidgetContainer
