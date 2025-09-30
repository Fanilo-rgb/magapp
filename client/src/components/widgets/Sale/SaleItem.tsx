import {Banknote, CircleDollarSign, Ellipsis, PillBottle, Printer} from "lucide-react";
import IconButton from "../../ui/buttons/IconButton.tsx";
import {useState} from "react";

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

  return (
    <div
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      className="h-8 sm:h-10 flex justify-between items-center cursor-pointer border shadow shadow-transparent hover:shadow-black/10 border-gray-300 p-1 sm:p-2 rounded-xl transition gap-2"
    >
      <span className="truncate flex-1">{data.name}</span>
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
        <span className="w-20 text-center">{data.products.totalPrice.toLocaleString()}</span>
      </div>
      {isOver && (
        <div className="flex gap-2">
          <IconButton icon={Printer}/>
          <IconButton icon={Ellipsis}/>
        </div>
      )}
    </div>
  )
}
export default SaleItem
