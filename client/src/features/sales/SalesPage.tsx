import SalesList from "./components/SalesList.tsx";

const SalesPage = () => {
  return (
    <div className="h-full px-2 sm:p-10 pt-2 flex gap-2">
      <div className="w-full">
        <SalesList/>
      </div>
    </div>
  )
}
export default SalesPage
