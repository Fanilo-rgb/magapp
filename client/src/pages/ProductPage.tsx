import ProductList from "../features/products/components/ProductList.tsx";
import Button from "../shared/components/buttons/Button.tsx";
import {useNavigate} from "react-router-dom";

const ProductPage = () => {

  const navigate = useNavigate()

  return (
    <div className="h-full px-2 sm:p-10 pt-2 flex gap-2">
      <div className="flex flex-col flex-1 gap-2">
        <div>
          <Button
            onClick={() => navigate("?type=drawer&content=addProduct")}
            variant="secondary"
          >
            Ajouter un Produit
          </Button>
        </div>
        <ProductList/>
      </div>
    </div>
  )
}
export default ProductPage
