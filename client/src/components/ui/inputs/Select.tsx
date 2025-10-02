import Button from "../buttons/Button.tsx";
import {X} from "lucide-react";
import React, {type ReactNode, useState} from "react";

type SelectProps<T> = {
  items: T[]
  onSelect: (item: T) => void;
  renderItem: (item: T) => ReactNode
  getKey: (item: T) => string | number
  getLabel: (item: T) => string
  placeholder?: string
}

function Select<T>({ items, onSelect, renderItem, getKey, placeholder, getLabel }: SelectProps<T>) {

  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredItems = items.filter(item =>
    getLabel(item).toLowerCase().includes(query.toLowerCase())
  )

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClick = () => {
    handleClose()
    setQuery("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key)

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : 0
      )
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredItems.length - 1
      )
    }

    if (e.key === "Enter" && filteredItems.length > 0) {
      e.preventDefault()
      const item = filteredItems[selectedIndex]
      onSelect(item)
      setQuery("")
    }

    if (e.key === "Escape") {
      e.preventDefault()
      handleClose()
    }

    if (e.key === "Delete") {
      e.preventDefault()
      setQuery("")
    }
  }

  return (
    <div className="relative z-10">
      <div className="flex gap-2 items-center">
        <input
          className="bg-white/50 backdrop-blur-md px-2 py-1 border border-gray-300 rounded-lg flex-1 outline-0 ring ring-transparent focus:ring-cyan-400 focus:border-cyan-400 transition "
          type="text"
          placeholder={placeholder ?? "Selectionner ..."}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelectedIndex(0)
          }}
          onKeyDown={handleKeyDown}
          onClick={handleOpen}
          onBlur={() => {
            setTimeout(() => {
              handleClose()
            }, 100)
          }}
        />
        <Button
          onClick={handleClick}
          icon={X}
        />
      </div>
      {open && (
        <ul className="absolute bg-white/90 shadow-md p-1 rounded-xl w-full">
          {filteredItems.length === 0 && (
            <div className="text-center p-3 text-gray-400">
              Aucun elements trouver
            </div>
          )}

          {filteredItems.length > 0 && filteredItems.map((item, index) => (
            <li
              className={`cursor-pointer hover:bg-black/5 overflow-hidden rounded-lg transition ${ index === selectedIndex && "bg-black/5" }`}
              onClick={() => onSelect(item)}
              key={getKey(item)}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default Select
