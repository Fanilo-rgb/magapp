import SaleWidget from "../components/widgets/sale/SaleWidget.tsx";
import MembershipWidget from "../components/widgets/membership/MembershipWidget.tsx";
import Hello from "../components/widgets/fun/Hello.tsx";
import PatientWidget from "../components/widgets/patient/PatientWidget.tsx";

const MainPage = () => {

  return (
    <div className="h-full px-2 sm:px-0 pt-2 sm:pt-10">
      <div className="flex flex-col gap-10 pb-10">
        <Hello/>
        <SaleWidget/>
        <MembershipWidget/>
        <PatientWidget/>
      </div>
    </div>
  )
}

export default MainPage
