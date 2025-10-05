import {useSearchParams} from "react-router-dom";
import ChoicesList from "../../../shared/components/inputs/ChoicesList.tsx";
import {HandCoins, NotebookPen, UserRoundCog} from "lucide-react";
import type {Label} from "../../../shared/types/types.ts";

const SaleView = () => {

  const [searchParams] = useSearchParams()

  const distContent = searchParams.get("id")
  const customerContent = searchParams.get("customerId")

  return (
    <div className="relative flex flex-col gap-4 py-4">

      {distContent && <DistributorView/>}

      {customerContent && <CustomerView/>}

    </div>
  )
}
export default SaleView

const DistributorView = () => {

  const saleChoices: Label[] = [{ value: "sale", placeholder: "Achat", color: "pink" }]

  const paymentChoices: Label[] = [{ value: "liquid", placeholder: "Cash", color: "green" }]

  return (
    <>
      <div className="flex justify-between">
        <span className="font-semibold">#00001</span>
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
          icon={NotebookPen}
          label="Type de vente"
          choices={saleChoices}
          disable
        />
        <ChoicesList
          icon={HandCoins}
          choices={paymentChoices}
          label="Type de payement"
          disable
        />
      </div>

      <hr/>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500 pl-2">Achat</p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="truncate">Kuding</span>
            <input
              type="number"
              className="w-12 py-1 text-center outline-0"
              value={1}
              readOnly
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="w-12 text-center">12 $</div>
              <div className="w-28 text-center">43 200 ar</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="truncate">Kuding</span>
            <input
              type="number"
              className="w-12 py-1 text-center outline-0"
              value={1}
              readOnly
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="w-12 text-center">12 $</div>
              <div className="w-28 text-center">43 200 ar</div>
            </div>
          </div>
        </div>
      </div>

      <hr/>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500 pl-2">Commande</p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="truncate">Kuding</span>
            <input
              type="number"
              className="w-12 py-1 text-center outline-0"
              value={1}
              readOnly
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="w-12 text-center">12 $</div>
              <div className="w-28 text-center">43 200 ar</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-lg mt-2">
        <p>Total: <span className="font-bold">453 600 ar</span></p>
        <p>Bv: <span className="font-bold">240 $</span></p>
      </div>
    </>
  )
}

const CustomerView = () => {

  const personChoices: Label[] = [{ value: "customer", placeholder: "Client", color: "blue" },]

  const saleChoices: Label[] = [{ value: "sale", placeholder: "Achat", color: "pink" }]

  const paymentChoices: Label[] = [{ value: "telma", placeholder: "Mvola", color: "yellow" }]

  return (
    <>
      <div className="flex justify-between">
        <span className="font-semibold">#00001</span>
        <span className="text-gray-500">Il y a 2h</span>
      </div>

      <div>
        <p className="w-full text-lg font-semibold py-1">
          Ranarivony Felana
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <ChoicesList
          icon={UserRoundCog}
          label="Type de personne"
          choices={personChoices}
          disable
        />
        <ChoicesList
          icon={NotebookPen}
          label="Type de vente"
          choices={saleChoices}
          disable
        />
        <ChoicesList
          icon={HandCoins}
          choices={paymentChoices}
          label="Type de payement"
          disable
        />
      </div>

      <div className="bg-cyan-200/50 text-cyan-800 p-2 rounded">
        <p className="text-xs pb-2 text-cyan-600">Distributeur</p>
        <div className="text-md flex gap-2 items-center">
          <span className="w-24">18 00 80 80</span>
          <span className="verticalDivider"/>
          <span className="truncate">Andriambololona Faniloniaina Princy</span>
        </div>
      </div>

      <hr/>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500 pl-2">Achat</p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="truncate">Kuding</span>
            <input
              type="number"
              className="w-12 py-1 text-center outline-0"
              value={1}
              readOnly
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="w-12 text-center">12 $</div>
              <div className="w-28 text-center">43 200 ar</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="truncate">Kuding</span>
            <input
              type="number"
              className="w-12 py-1 text-center outline-0"
              value={1}
              readOnly
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="w-12 text-center">12 $</div>
              <div className="w-28 text-center">43 200 ar</div>
            </div>
          </div>
        </div>
      </div>

      <hr/>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500 pl-2">Commande</p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="truncate">Kuding</span>
            <input
              type="number"
              className="w-12 py-1 text-center outline-0"
              value={1}
              readOnly
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="w-12 text-center">12 $</div>
              <div className="w-28 text-center">43 200 ar</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-lg mt-2">
        <p className="text-base">Total: <span className="font-semibold">453 600 ar</span></p>
        <p className="text-base">Bv: <span className="font-semibold">240 $</span></p>
        <p>20%: <span className="font-bold">75 300 ar</span></p>
      </div>
    </>
  )
}
