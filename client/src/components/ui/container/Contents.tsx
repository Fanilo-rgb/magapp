import {useSearchParams} from "react-router-dom";
import React from "react";

type ContentPaddingProps = {
  children: React.ReactNode
}

const Contents = () => {

  const [searchParams] = useSearchParams()

  const content = searchParams.get("content")

  switch (content) {
    case "newSale":
      return <ContentPadding>Creation de facture</ContentPadding>
    case "newApplication":
      return <ContentPadding>Creation d'un adhesion</ContentPadding>
    case "newPatient":
      return <ContentPadding>Ajout d'un nouveau patient</ContentPadding>
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