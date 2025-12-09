import SalesList from "./components/SalesList.tsx";
import PageWrapper from "../../shared/components/forPages/PageWrapper.tsx";

const SalesPage = () => {
  return (
    <PageWrapper title="Achats">
      <SalesList/>
    </PageWrapper>
  )
}
export default SalesPage
