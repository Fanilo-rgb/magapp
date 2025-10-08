import type {Label} from "../../../shared/types/types.ts";
import ChoicesList from "../../../shared/components/inputs/ChoicesList.tsx";
import {CircleSmall, Clipboard} from "lucide-react";

const PatientView = () => {
  const genderChoices: Label[] = [
    { value: "none", placeholder: "Non precis", color: "gray" },
  ]

  const checkupChoices: Label[] = [
    { value: "examination", placeholder: "Detection", color: "pink"},
  ]

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="font-semibold">#00001</span>
        <span className="text-gray-500">Il y a 2h</span>
      </div>

      <div>
        <p className="w-full text-lg font-semibold py-1">
          Andriambololona Faniloniaina Princy
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <ChoicesList
          label="Checkup"
          icon={Clipboard}
          choices={checkupChoices}
          disable
        />
        <ChoicesList
          label="Genre"
          icon={CircleSmall}
          choices={genderChoices}
          disable
        />
        <div className="flex items-center">
          <div className="w-44 p-1 text-gray-500">
            Date de naissance
          </div>
          <div className="p-1 flex-1 rounded transition">
            <p className="w-fit pl-1 text-xs bg-white shadow rounded py-0.5 px-1">
              13/06/1991
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-44 p-1 text-gray-500">
            Taille (cm) :
          </div>
          <div className="p-1 flex-1 rounded transition">
            <input
              className="outline-0 pl-1 text-xs bg-white shadow rounded py-0.5 px-1"
              type="number"
              value="184"
              readOnly
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-44 p-1 text-gray-500">
            Poids (kg) :
          </div>
          <div className="p-1 flex-1 rounded transition">
            <input
              className="outline-0 pl-1 text-xs bg-white shadow rounded py-0.5 px-1"
              type="number"
              value="50.63"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="bg-cyan-200/50 text-cyan-800 p-2 rounded">
        <p className="text-xs pb-2 text-cyan-600">Distributeur</p>
        <div className="text-md flex gap-2 items-center">
          <span className="w-24">18 00 80 80</span>
          <span className="verticalDivider"/>
          <span className="truncate">Andriambololona Faniloniaina Princy</span>
        </div>
      </div>

    </div>
  )
}
export default PatientView
