import ProductItem from "./ProductItem.tsx";
import {useNavigate} from "react-router-dom";

const products = [
  {
    order: 1,
    name: "Kuding",
    price: 43200,
    bv: 12
  },
  {
    order: 2,
    name: "Cordyceps",
    price: 86400,
    bv: 24
  },
  {
    order: 3,
    name: "Ginseng",
    price: 129600,
    bv: 36
  },
  {
    order: 4,
    name: "Reishi",
    price: 172800,
    bv: 48
  },
  {
    order: 5,
    name: "Schisandra",
    price: 216000,
    bv: 60
  }
]

const ProductList = () => {

  const navigate = useNavigate()

  const handleClick = (query: string) => {
    navigate(query)
  }

  return (
    <div className="relative flex flex-col flex-1">
      <div className="bg-gray-100 p-1 rounded-xl flex gap-2 items-center">
        <div className="w-16">
          <button className="bg-cyan-300 p-1 rounded-lg w-full">
            Ordre
          </button>
        </div>
        <span className="verticalDivider" />
        <div className="flex-1">
          <button className="p-1 rounded-lg w-full text-left">
            Nom
          </button>
        </div>
        <span className="verticalDivider" />
        <div className="w-24">
          <button className="p-1 rounded-lg w-full">
            Prix
          </button>
        </div>
        <span className="verticalDivider" />
        <div className="w-16">
          <button className="p-1 rounded-lg w-full">
            Bv
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1 mt-2 overflow-auto gap-2 divide-y divide-gray-300">
        {products.map(product => (
          <ProductItem
            key={product.order}
            onClick={() => handleClick(`?type=drawer&content=product&id=${product.order}`)}
            order={product.order}
            name={product.name}
            price={product.price}
            bv={product.bv}
          />
        ))}
      </div>
    </div>
  )
}
export default ProductList
