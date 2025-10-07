import React from "react";
import {useSearchParams} from "react-router-dom";

import Drawer from "./Drawer.tsx";
import Modal from "./Modal.tsx";

import ApplicationForm from "../../features/applications/components/ApplicationForm.tsx";
import SaleForm from "../../features/sales/components/SaleForm.tsx";
import PatientForm from "../../features/patients/components/PatientForm.tsx";
import SaleView from "../../features/sales/components/SaleView.tsx";
import ApplicationView from "../../features/applications/components/ApplicationView.tsx";
import PatientView from "../../features/patients/components/PatientView.tsx";

type BaseProps = { onClose?: () => void }

const componentMap: Record<string, React.FC<BaseProps>> = {
  addApplication: ApplicationForm,
  addSale: SaleForm,
  addPatient: PatientForm,
  sale: SaleView,
  application: ApplicationView,
  patient: PatientView,
}

const UiContainer = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get("type")
  const content = searchParams.get("content")
  const Content = content ? componentMap[content] : null

  const close = () => {
    searchParams.delete("type")
    searchParams.delete("content")
    setSearchParams(searchParams)
  }

  if (!Content) return null

  const Container = type === "drawer" ? Drawer : Modal

  return (
    <Container isOpen={true} onClose={close}>
      <Content/>
    </Container>
  )
}
export default UiContainer
