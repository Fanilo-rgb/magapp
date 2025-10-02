import {Banknote, CircleDollarSign, Ellipsis, PillBottle, Printer} from "lucide-react";
import IconButton from "../../ui/buttons/IconButton.tsx";
import {useState} from "react";
import {formatCurrency} from "../../../lib/utils/formatCurrency.ts";
import {useMediaQuery} from "../../../lib/hooks/useMediaQuery.ts";
import {useNavigate} from "react-router-dom";

type Props = {
  data: {
    id: number
    isCustomer: boolean
    name: string
    products: {
      quantity: number
      bv: number
      totalPrice: number
    }
    createdAt: Date
  }
}

const SaleItem = ({data}: Props) => {
  const [isOver, setIsOver] = useState(false)

  const navigate = useNavigate()

  const isMid = useMediaQuery("md", "up")

  const handleClick = () => {
    navigate(`?container=drawer&content=sale${data.isCustomer ? `&customerId=${data.id}` : `&id=${data.id}`}`)
  }

  return (
    <div
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      className="relative"
    >
      <div
        onClick={handleClick}
        className="h-8 sm:h-10 flex justify-between items-center cursor-pointer border shadow shadow-transparent hover:shadow-black/20 border-gray-300 p-1 sm:p-2 rounded-xl transition gap-2"
      >
        {data.isCustomer && <span className="h-2 rounded-full ml-2 sm:ml-1 w-2 bg-cyan-400"/>}
        <span className="truncate flex-1 pl-1">{data.name}</span>
        <span className="verticalDivider"/>
        <div className="flex gap-2 items-center">
          <PillBottle size={16}/>
          <span className="w-4 text-center">{data.products.quantity}</span>
        </div>
        <span className="verticalDivider"/>
        <div className="flex gap-2 items-center">
          <CircleDollarSign size={16}/>
          <span className="w-8 text-center">{data.products.bv}</span>
        </div>
        <span className="verticalDivider"/>
        <div className="flex gap-2 items-center">
          <Banknote size={16}/>
          <span className="hidden md:block w-20 text-center">{data.products.totalPrice.toLocaleString()}</span>
          <span className="block md:hidden w-10 text-center">{formatCurrency(data.products.totalPrice)}</span>
        </div>
      </div>
      {isOver && (
        <div className="z-10 absolute flex justify-end gap-2 bg-white top-1/2 -translate-y-1/2 w-20 right-1 sm:right-2">
          {isMid && <IconButton icon={Printer}/>}
          <IconButton icon={Ellipsis}/>
        </div>
      )}
    </div>
  )
}
export default SaleItem
