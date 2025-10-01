import Button from "../ui/buttons/Button.tsx";
import {Clipboard, type LucideIcon, Plus, ReceiptText, UserRoundPen} from "lucide-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

type actionButtonType = {
  content: string
  icon: LucideIcon
  placeholder: string
}

const buttons: actionButtonType[] = [
  { content: "newSale", icon: ReceiptText, placeholder: "... un achat" },
  { content: "newApplication", icon: Clipboard, placeholder: "... une adhesion" },
  { content: "newPatient", icon: UserRoundPen, placeholder: "... un patient" },
]

const Header = () => {

  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()

  const handleCreateSale = (content: string) => {
    navigate(`?container=drawer&content=${content}`)
  }

  return (
    <div className="relative flex items-center py-1 px-3 gap-2 h-10 z-10">

      <div>
        Item 1
      </div>

      <div className="flex flex-1 justify-center">
        Item 2
      </div>

      <div className="flex">
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
                <Button icon={button.icon} onClick={() => handleCreateSale(button.content)}>
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
