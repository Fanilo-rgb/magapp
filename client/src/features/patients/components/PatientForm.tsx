import type {Label} from "../../../shared/types/types.ts";
import ChoicesList from "../../../shared/components/inputs/ChoicesList.tsx";
import {CircleSmall, Clipboard} from "lucide-react";
import InputDate from "../../../shared/components/inputs/InputDate.tsx";
import {formatDate} from "../../../shared/utils/dateUtils.ts";
import {useState} from "react";
import Button from "../../../shared/components/buttons/Button.tsx";

const genderChoices: Label[] = [
  { value: "none", placeholder: "Non precis", color: "gray" },
  { value: "male", placeholder: "Homme", color: "blue" },
  { value: "female", placeholder: "Femme", color: "red" }
]

const checkupChoices: Label[] = [
  { value: "examination", placeholder: "Detection", color: "pink"},
  { value: "appointment", placeholder: "Suivi", color: "green" }
]

const PatientForm = () => {

  const [birthDate, setBirthDate] = useState<Date | null>(null)

  return (
    <div className="relative flex flex-col gap-4">
      <div>
        <input
          type="text"
          spellCheck={false}
          className="outline-0 w-full text-lg font-semibold py-1 hover:placeholder:tracking-wider placeholder:font-light placeholder:text-gray-400"
          placeholder="Nom complet"
        />
      </div>
      <div className="flex flex-col gap-2">
        <ChoicesList
          label="Checkup"
          icon={Clipboard}
          choices={checkupChoices}
        />
        <ChoicesList
          label="Genre"
          icon={CircleSmall}
          choices={genderChoices}
        />
        <InputDate
          label="Date de naissance"
          value={formatDate(birthDate)}
          onChange={(e) => {
            const value = e.target.value
            const newDate = value ? new Date(value) : null
            setBirthDate(newDate)
          }}
        />
        <div className="flex items-center">
          <div className="w-44 p-1 text-gray-500">
            Taille (cm) :
          </div>
          <div className="hover:bg-black/5 p-1 flex-1 rounded transition">
            <input
              className="outline-0 pl-1 text-xs bg-white shadow rounded py-0.5 px-1"
              type="number"
              placeholder="Taille (cm)"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-44 p-1 text-gray-500">
            Poids (kg) :
          </div>
          <div className="hover:bg-black/5 p-1 flex-1 rounded transition">
            <input
              className="outline-0 pl-1 text-xs bg-white shadow rounded py-0.5 px-1"
              type="number"
              placeholder="Poids (kg)"
            />
          </div>
        </div>
      </div>

      <hr/>

      <div className="pl-5 text-gray-400 font-semibold">
        Details du distributeur
      </div>

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

      <div className="flex w-full">
        <Button variant={"secondary"} width={"full"}>
          Enregistrer
        </Button>
      </div>
    </div>
  )
}
export default PatientForm
