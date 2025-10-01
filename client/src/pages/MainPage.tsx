import SaleWidget from "../components/widgets/sale/SaleWidget.tsx";
import MembershipWidget from "../components/widgets/membership/MembershipWidget.tsx";

const MainPage = () => {

  return (
    <div className="h-full px-2 sm:px-0 pt-2 sm:pt-10">
      <div className="flex flex-col gap-10 pb-10">
        <SaleWidget/>
        <MembershipWidget/>
      </div>
    </div>
  )
}

export default MainPage
