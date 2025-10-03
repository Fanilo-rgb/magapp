import {Search} from "lucide-react";
import {useState} from "react";

const SearchBar = () => {

  const [isHover, setIsHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative cursor-pointer"
    >
      <div className={`absolute blur-xs rounded-full top-0 left-0 h-full w-full -z-10 bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 animate-[spin_6s_linear_infinite] transition duration-500 ${isHover ? "opacity-100 scale-100" : "opacity-0 scale-80"}`}/>
      <div className="z-10 p-2 rounded-full bg-white/80 text-gray-600">
        <Search/>
      </div>
    </div>
  )
}
export default SearchBar
