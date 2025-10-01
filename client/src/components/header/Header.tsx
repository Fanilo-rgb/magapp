import Button from "../ui/buttons/Button.tsx";
import {Clipboard, Plus, ReceiptText, UserRoundPen} from "lucide-react";
import {useState} from "react";

const Header = () => {

  const [showMenu, setShowMenu] = useState(false)

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
              <Button icon={ReceiptText}>
                ... une facture
              </Button>
              <Button icon={Clipboard}>
                ... un adhesion
              </Button>
              <Button icon={UserRoundPen}>
                ... un patient
              </Button>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
export default Header
