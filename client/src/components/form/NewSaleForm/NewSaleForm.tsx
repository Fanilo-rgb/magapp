import ChoicesList from "../../ui/inputs/ChoicesList.tsx";
import type {Label} from "../../../lib/types/types.ts";
import {HandCoins, NotebookPen, UserRoundCog} from "lucide-react";
import {useState} from "react";

const personChoices: Label[] = [
  { value: "distributor", placeholder: "Distributeur", color: "purple" },
  { value: "customer", placeholder: "Client", color: "blue" },
]

const saleChoices: Label[] = [
  { value: "sale", placeholder: "Achat", color: "pink" },
  { value: "borrow", placeholder: "Borrow", color: "red" }
]

const payementChoices: Label[] = [
  { value: "liquid", placeholder: "Cash", color: "green" },
  { value: "telma", placeholder: "Mvola", color: "yellow" },
  { value: "airtel", placeholder: "Airtel Money", color: "red" },
  { value: "orange", placeholder: "Orange Money", color: "orange" },
  { value: "multiple", placeholder: "Multiple", color: "blue" }
]

const NewSaleForm = () => {

  const [payement, setPayement] = useState("liquid")

  return (
    <div className="flex flex-col gap-4 py-4">
      <div>
        <input
          type="text"
          className="outline-0 w-full text-lg font-semibold py-1 hover:placeholder:tracking-wider placeholder:font-light placeholder:text-gray-400 transition"
          placeholder="Numero carte"
        />
        <input
          type="text"
          spellCheck={false}
          className="outline-0 w-full text-lg font-semibold py-1 hover:placeholder:tracking-wider placeholder:font-light placeholder:text-gray-400"
          placeholder="Nom complet"
        />
      </div>
      <div className="flex flex-col gap-2">
        <ChoicesList
          icon={UserRoundCog}
          label="Type d'utilisateur"
          choices={personChoices}
        />
        <ChoicesList
          icon={NotebookPen}
          label="Type de vente"
          choices={saleChoices}
        />
        <ChoicesList
          icon={HandCoins}
          choices={payementChoices}
          label="Type de payement"
          value={payement}
          onChange={setPayement}
        />
      </div>
    </div>
  )
}
export default NewSaleForm
