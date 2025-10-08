
type ProductItemProps = {
  order: number
  name: string
  price: number
  bv: number
  onClick?: () => void
}

const ProductItem = ({ order, name, price, bv, onClick }: ProductItemProps) => {

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white flex items-center transition shadow-sm shadow-transparent hover:shadow-black/10 hover:bg-gray-50 rounded-xl p-1 gap-2"
    >
      <div className="w-16">
        <div className="w-full bg-blue-100 text-blue-800 py-1 pl-3 flex rounded-lg text-xs font-medium">
          #{order}
        </div>
      </div>
      <span className="verticalDivider" />
      <div className="flex-1 truncate">
        {name}
      </div>
      <span className="verticalDivider" />
      <div className="w-24 text-center">
        {price.toLocaleString()} ar
      </div>
      <span className="verticalDivider" />
      <div className="w-16 text-center">
        {bv}
      </div>
    </div>
  )
}
export default ProductItem
