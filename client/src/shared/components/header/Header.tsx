import Button from "../buttons/Button.tsx";
import {Clipboard, type LucideIcon, Plus, ReceiptText, UserRoundPen} from "lucide-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import SearchBar from "./SearchBar.tsx";

type actionButtonType = {
  content: string
  icon: LucideIcon
  placeholder: string
}

const buttons: actionButtonType[] = [
  { content: "addSale", icon: ReceiptText, placeholder: "... un achat" },
  { content: "addApplication", icon: Clipboard, placeholder: "... une adhesion" },
  { content: "addPatient", icon: UserRoundPen, placeholder: "... un patient" },
]

const Header = () => {

  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()

  const handleCreateSale = (content: string) => {
    navigate(`?type=drawer&content=${content}`)
  }

  const sideWidth = "h-full w-32"

  return (
    <div className="relative flex items-center py-1 px-3 gap-2 h-14 z-10">

      <div className={sideWidth}>
        Item 1
      </div>

      <div className="flex flex-1 justify-center items-center h-full">
        <SearchBar/>
      </div>

      <div className={`flex items-center justify-end ${sideWidth}`}>
        <div className="relative">
          <Button
            onClick={() => setShowMenu(!showMenu)}
            onBlur={() => setTimeout(() => setShowMenu(false), 200)}
            icon={Plus}
            variant="secondary"
          >
            Creer
          </Button>
          {showMenu && (
            <div className="absolute right-0 w-48 bg-white/10 backdrop-blur-xs shadow-lg rounded-xl p-1 flex flex-col">
              {buttons.map(button => (
                <Button key={button.content} icon={button.icon} onClick={() => handleCreateSale(button.content)}>
                  {button.placeholder}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
export default Header
