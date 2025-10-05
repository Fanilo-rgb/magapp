import {useSearchParams} from "react-router-dom";
import React, {type JSX} from "react";
import NewSaleForm from "../../../features/sales/components/NewSaleForm.tsx";
import SaleView from "../../../features/sales/components/SaleView.tsx";
import ApplicationForm from "../../../features/applications/components/ApplicationForm.tsx";
import ApplicationView from "../../../features/applications/components/ApplicationView.tsx";
import PatientForm from "../../../features/patients/components/PatientForm.tsx";

type ContentPaddingProps = {
  children: React.ReactNode
}

const Contents = () => {

  const [searchParams] = useSearchParams()

  const content = searchParams.get("content")

  let c: JSX.Element | null

  switch (content) {
    case "newSale":
      c = <NewSaleForm/>
      break
    case "newApplication":
      c = <ApplicationForm/>
      break
    case "newPatient":
      c = <div><PatientForm/></div>
      break
    case "sale":
      c = <SaleView/>
      break
    case "application":
      c = <ApplicationView/>
      break
    case "patient":
      c = <div>Vue des infos d'un patient</div>
      break
    default:
      c = <div>Contenu par defaut</div>
      break
  }

  return (
    <ContentPadding>
      {c}
    </ContentPadding>
  )
}
export default Contents

const ContentPadding = ({children}: ContentPaddingProps) => {
  return (
    <div className="relative px-12 h-fit w-full">
      {children}
    </div>
  )
}
