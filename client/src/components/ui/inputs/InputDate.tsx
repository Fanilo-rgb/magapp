import React from "react";

type InputProps = React.ComponentProps<"input"> & {
  label?: string
}

const InputDate = ({ label = "Date", ...props }: InputProps) => {
  return (
    <div className="flex items-center">
      <div className="w-44 p-1 text-gray-500">
        {label}
      </div>
      <div className="hover:bg-black/5 p-1 flex-1 rounded transition">
        <input
          {...props}
          className="outline-0 pl-1 text-xs bg-white shadow rounded py-0.5 px-1"
          type="date"
        />
      </div>
    </div>
  )
}
export default InputDate
