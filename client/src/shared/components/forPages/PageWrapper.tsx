import type {ReactNode} from "react";
import Button from "../buttons/Button.tsx";

type pageWrapperType = {
  children: ReactNode
  title: string
  action?: {
    placeholder: string,
    onClick: () => void
  }
}

const PageWrapper = ({children, title, action}: pageWrapperType) => {
  return (
    <div className="h-full px-2 sm:px-12 pt-2 flex gap-2">
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-center pb-4">
          <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>
          <div>
            {action &&
              <Button
                onClick={action.onClick}
                variant="secondary"
              >
                {action.placeholder}
              </Button>
            }
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
export default PageWrapper
