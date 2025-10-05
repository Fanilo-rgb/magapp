import SaleWidget from "../features/sales/widget/SaleWidget.tsx";
import MembershipWidget from "../features/applications/widget/MembershipWidget.tsx";
import Hello from "../shared/widgets/fun/Hello.tsx";
import PatientWidget from "../features/patients/widget/PatientWidget.tsx";

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
