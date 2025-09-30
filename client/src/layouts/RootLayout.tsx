import {Outlet} from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">

      <div className="h-full flex flex-col">
        <div className="p-1 shadow">
          Header
        </div>

        <div className="flex flex-1">
          <div className="hidden p-2 border-r border-gray-300">
            Dashboard
          </div>

          <div className="relative flex-1">
            <div className="absolute top-0 left-0 bottom-0 right-0 overflow-auto">
              <Outlet/>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default RootLayout
