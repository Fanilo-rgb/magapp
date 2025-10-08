import type {Label} from "../../../shared/types/types.ts";
import ChoicesList from "../../../shared/components/inputs/ChoicesList.tsx";
import {CircleSmall, Earth} from "lucide-react";
import InputDate from "../../../shared/components/inputs/InputDate.tsx";
import {useState} from "react";
import {formatDate} from "../../../shared/utils/dateUtils.ts";
import Button from "../../../shared/components/buttons/Button.tsx";

const genderChoices: Label[] = [
  { value: "none", placeholder: "Non precis", color: "gray" },
  { value: "male", placeholder: "Homme", color: "blue" },
  { value: "female", placeholder: "Femme", color: "red" }
]

const nationalityChoices: Label[] = [
  { value: "malagasy", placeholder: "Malagasy", color: "green" },
]

const ApplicationForm = () => {

  const [birthDate, setBirthDate] = useState<Date | null>(new Date())

  return (
    <div className="relative flex flex-col gap-4">

      <div className="pl-5 text-gray-400 font-semibold">
        Details du demandeur
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
      <div className="flex flex-col gap-2">
        <ChoicesList
          label="Genre"
          icon={CircleSmall}
          choices={genderChoices}
        />
        <ChoicesList
          label="Nationalite"
          icon={Earth}
          choices={nationalityChoices}
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
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs text-gray-500 pl-2 pb-0.5">CIN</p>
          <input
            className="outline-0 p-1 w-full"
            placeholder="101 000 000 000"
          />
        </div>
        <div>
          <p className="text-xs text-gray-500 pl-2 pb-0.5">Numero Telephone</p>
          <input
            className="outline-0 p-1 w-full"
            placeholder="030 12 345 67"
          />
        </div>
        <div>
          <p className="text-xs text-gray-500 pl-2 pb-0.5">E-mail</p>
          <input
            className="outline-0 p-1 w-full"
            placeholder="exemple@maglife.com"
          />
        </div>
        <div>
          <p className="text-xs text-gray-500 pl-2 pb-0.5">Adresse</p>
          <div className="flex items-center gap-2">
            <input
              className="outline-0 p-1 flex-1"
              placeholder="Adresse"
            />
            <span className="verticalDivider" />
            <input
              className="p-1 w-10 text-center placeholder:text-xs outline-0 rounded hover:bg-black/5 transition"
              placeholder="Code postale"
            />
          </div>
        </div>
      </div>

      <hr/>

      <div className="pl-5 text-gray-400 font-semibold">
        Details du sponsor
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

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs text-gray-500 pl-2 pb-0.5">CIN</p>
          <input
            className="outline-0 p-1 w-full"
            placeholder="101 000 000 000"
          />
        </div>
        <div>
          <p className="text-xs text-gray-500 pl-2 pb-0.5">Numero Telephone</p>
          <input
            className="outline-0 p-1 w-full"
            placeholder="030 12 345 67"
          />
        </div>
        <div>
          <p className="text-xs text-gray-500 pl-2 pb-0.5">E-mail</p>
          <input
            className="outline-0 p-1 w-full"
            placeholder="exemple@maglife.com"
          />
        </div>
        <div>
          <p className="text-xs text-gray-500 pl-2 pb-0.5">Adresse</p>
          <div className="flex items-center gap-2">
            <input
              className="outline-0 p-1 flex-1"
              placeholder="Adresse"
            />
            <span className="verticalDivider" />
            <input
              className="p-1 w-10 text-center placeholder:text-xs outline-0 rounded hover:bg-black/5 transition"
              placeholder="Code postale"
            />
          </div>
        </div>
      </div>

      <hr/>

      <div className="pl-5 text-gray-400 font-semibold">
        Details du placement
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

      <hr/>

      <div className="flex w-full">
        <Button variant={"secondary"} width={"full"}>
          Enregistrer
        </Button>
      </div>

    </div>
  )
}
export default ApplicationForm