import {useSearchParams} from "react-router-dom";
import React from "react";
import NewSaleForm from "../../form/NewSaleForm/NewSaleForm.tsx";

type ContentPaddingProps = {
  children: React.ReactNode
}

const Contents = () => {

  const [searchParams] = useSearchParams()

  const content = searchParams.get("content")

  switch (content) {
    case "newSale":
      return <ContentPadding><NewSaleForm/></ContentPadding>
    case "newApplication":
      return <ContentPadding>Creation d'un adhesion</ContentPadding>
    case "newPatient":
      return <ContentPadding>Ajout d'un nouveau patient</ContentPadding>
    case "sale":
      return <ContentPadding>Vue d'un achat</ContentPadding>
    case "application":
      return <ContentPadding>Vue d'une adhesion</ContentPadding>
    case "patient":
      return <ContentPadding>Vue des info d'un patient</ContentPadding>
    default:
      return <ContentPadding>Contenu par defaut</ContentPadding>
  }
}
export default Contents

const ContentPadding = ({children}: ContentPaddingProps) => {
  return (
    <div className="relative px-12 h-fit w-full">
      {children}
    </div>
  )
}