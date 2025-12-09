import ProductList from "./components/ProductList.tsx";
import {useNavigate} from "react-router-dom";
import PageWrapper from "../../shared/components/forPages/PageWrapper.tsx";
import {useEffect} from "react";
import useProduct from "./hooks/useProduct.tsx";

const ProductPage = () => {

  const { products, fetchProducts } = useProduct()
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <PageWrapper
      title="Produit"
      action={{ placeholder: "Ajouter un produit", onClick: () => navigate("?type=drawer&content=addProduct") }}
    >
      <div className="flex flex-col flex-1 gap-2">
        <ProductList products={products}/>
      </div>
    </PageWrapper>
  )
}
export default ProductPage
