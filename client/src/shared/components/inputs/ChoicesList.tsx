import {useEffect, useRef, useState} from "react";
import {type LucideIcon} from "lucide-react";
import type {Label, Color} from "../../types/types.ts";

type ChoicesListProps = {
  icon?: LucideIcon
  label?: string;
  choices: Label[];
  value?: string;
  onChange?: (value: string) => void;
  disable?: boolean
};

const colorMap: Record<Color, string> = {
  blue: "bg-blue-200 text-blue-900",
  gray: "bg-gray-200 text-gray-800",
  red: "bg-red-200 text-red-800",
  green: "bg-green-200 text-green-800",
  orange: "bg-orange-200 text-orange-800",
  pink: "bg-pink-200 text-pink-800",
  purple: "bg-purple-200 text-purple-800",
  yellow: "bg-yellow-200 text-yellow-800",
};

const ChoicesList = ({ icon: Icon, disable = false, label = "Description", choices, value, onChange }: ChoicesListProps) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open]);

  const selected = choices.find((c) => c.value === value) || choices[0];

  const handleSelect = (choice: Label) => {
    onChange?.(choice.value);
    setOpen(false);
  };

  return (
    <div className="flex items-center w-full relative">
      {/* Label */}
      <div className="cursor-default flex gap-1 text-gray-500 w-8 sm:w-44 bg-transparent p-1 rounded-sm transition">
        {Icon && <Icon size={16} />}
        <span className="hidden sm:block">{label}</span>
      </div>

      {/* Selected */}
      <div
        onClick={() => setOpen(!open)}
        className={`relative bg-transparent p-1 rounded-sm flex-1 transition ${!disable && "hover:bg-black/5 cursor-pointer"}`}
      >
        <p
          className={`text-xs w-fit rounded px-1 py-0.5 select-none ${
            selected.color ? colorMap[selected.color] : colorMap["gray"]
          }`}
        >
          {selected.placeholder}
        </p>

        {/* Dropdown */}
        {open && !disable && (
          <div
            ref={dropdownRef}
            className="absolute bg-white shadow rounded-sm w-full left-0 top-0 z-10 p-2"
          >
            <span className="text-xs text-gray-500 mb-2 block">
              Sélectionnez une option
            </span>
            <div className="flex flex-wrap gap-1">
              {choices.map((choice, index) => (
                <p
                  key={index}
                  onClick={() => handleSelect(choice)}
                  className={`cursor-pointer text-xs w-fit rounded px-1 py-0.5 select-none hover:opacity-80 transition ${
                    choice.color ? colorMap[choice.color] : colorMap["gray"]
                  }`}
                >
                  {choice.placeholder}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoicesList;
