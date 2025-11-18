import React from "react";

type StaticLinkContainerProps = {
  children: React.ReactNode
}

const StaticLinkContainer = ({ children }: StaticLinkContainerProps) => {
  return (
    <div className="text-xs mb-2 pb-2 border-b border-gray-300">
      {children}
    </div>
  )
}
export default StaticLinkContainer
