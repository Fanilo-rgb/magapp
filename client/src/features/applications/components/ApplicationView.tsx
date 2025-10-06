import type {Label} from "../../../shared/types/types.ts";
import ChoicesList from "../../../shared/components/inputs/ChoicesList.tsx";
import {CircleSmall, Earth} from "lucide-react";

const ApplicationView = () => {

  const gender: Label[] = [{ value: "male", placeholder: "Homme", color: "blue" }]

  const nationality: Label[] = [{ value: "malagasy", placeholder: "Malagasy", color: "green" }]

  return (
    <div className="relative flex flex-col gap-4 py-4">
      <div className="flex justify-end">
        <span className="text-gray-500">Il y a 2h</span>
      </div>

      <div>
        <p className="w-full text-lg font-semibold py-1">
          18 00 80 80
        </p>
        <p className="w-full text-lg font-semibold py-1">
          Andriambololona Faniloniaina Princy
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <ChoicesList
          label="Genre"
          icon={CircleSmall}
          choices={gender}
          disable
        />
        <ChoicesList
          label="Nationalite"
          icon={Earth}
          choices={nationality}
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
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500 pl-2">CIN :</p>
          <p className="p-1 flex-1">
            101 000 000 000
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500 pl-2">Numero Telephone :</p>
          <p className="p-1 flex-1">
            034 58 502 63
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500 pl-2">E-mail :</p>
          <p className="p-1 flex-1">
            princy.faniloniaina@gmail.com
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 pl-2 pb-0.5">Adresse</p>
          <div className="flex items-center gap-2">
            <p className="p-1 flex-1">
              Une adresse
            </p>
            <span className="verticalDivider" />
            <p className="p-1 w-10 text-center">
              101
            </p>
          </div>
        </div>
      </div>

      <hr/>

      <div className="pl-5 text-gray-400 font-semibold">
        Details du sponsor
      </div>

      <div>
        <p className="w-full text-base font-semibold py-1">
          18 00 80 80
        </p>
        <p className="w-full text-base font-semibold py-1">
          Andriambololona Faniloniaina Princy
        </p>
      </div>

      <hr/>

      <div className="pl-5 text-gray-400 font-semibold">
        Details du placement
      </div>

      <div>
        <p className="w-full text-base font-semibold py-1">
          18 00 80 80
        </p>
        <p className="w-full text-base font-semibold py-1">
          Andriambololona Faniloniaina Princy
        </p>
      </div>

    </div>
  )
}

export default ApplicationView