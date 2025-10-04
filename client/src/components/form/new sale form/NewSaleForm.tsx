import ChoicesList from "../../ui/inputs/ChoicesList.tsx";
import type {Label} from "../../../lib/types/types.ts";
import {HandCoins, NotebookPen, Trash, UserRoundCog} from "lucide-react";
import {useState} from "react";
import Select from "../../ui/inputs/Select.tsx";
import Button from "../../ui/buttons/Button.tsx";

const personChoices: Label[] = [
  { value: "distributor", placeholder: "Distributeur", color: "purple" },
  { value: "customer", placeholder: "Client", color: "blue" },
]

const saleChoices: Label[] = [
  { value: "sale", placeholder: "Achat", color: "pink" },
  { value: "borrow", placeholder: "Borrow", color: "red" }
]

const paymentChoices: Label[] = [
  { value: "liquid", placeholder: "Cash", color: "green" },
  { value: "telma", placeholder: "Mvola", color: "yellow" },
  { value: "airtel", placeholder: "Airtel Money", color: "red" },
  { value: "orange", placeholder: "Orange Money", color: "orange" },
  { value: "multiple", placeholder: "Multiple", color: "blue" }
]

const products = [
  { id: 1, name: "Pomme", price: 1200, bv: 1 },
  { id: 2, name: "Banane", price: 800, bv: 2 },
  { id: 3, name: "Raisin", price: 2500, bv: 1.5 }
]

const NewSaleForm = () => {

  const handleSelect = ( p: typeof products[0]) => {
    console.log("Produit choisi:", p)
  }

  const productUi = (p: typeof products[0]) => (
    <div className="flex p-1 justify-between">
      <span>{p.name}</span>
      <span>{p.price.toLocaleString()} ar</span>
    </div>
  )

  const [payment, setPayment] = useState("liquid")

  return (
    <div className="relative flex flex-col gap-4 py-4">
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
          choices={paymentChoices}
          label="Type de payement"
          value={payment}
          onChange={setPayment}
        />
      </div>
      <hr/>
      <div className="py-2 bg-white/1">
        <Select
          items={products}
          getLabel={(p) => p.name}
          getKey={(p) => p.id}
          renderItem={(p) => (
            productUi(p)
          )}
          onSelect={handleSelect}
          placeholder="Choisir un produit"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500 pl-2">Achat</p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="truncate">Kuding</span>
            <input
              type="number"
              className="w-12 py-1 text-center outline-0"
              value={1}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="w-12 text-center">12 $</div>
              <div className="w-28 text-center">43 200 ar</div>
            </div>
            <div className="pr-4">
              <Button icon={Trash} variant={"red"}/>
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
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="w-12 text-center">12 $</div>
              <div className="w-28 text-center">43 200 ar</div>
            </div>
            <div className="pr-4">
              <Button icon={Trash} variant={"red"}/>
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
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="w-12 text-center">12 $</div>
              <div className="w-28 text-center">43 200 ar</div>
            </div>
            <div className="pr-4">
              <Button icon={Trash} variant={"red"}/>
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
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="w-12 text-center">12 $</div>
              <div className="w-28 text-center">43 200 ar</div>
            </div>
            <div className="pr-4">
              <Button icon={Trash} variant={"red"}/>
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
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="w-12 text-center">12 $</div>
              <div className="w-28 text-center">43 200 ar</div>
            </div>
            <div className="pr-4">
              <Button icon={Trash} variant={"red"}/>
            </div>
          </div>
        </div>
      </div>

      <div className="text-lg mt-2">
        <p>Total: <span className="font-bold">453 600 ar</span></p>
        <p>Bv: <span className="font-bold">240 $</span></p>
      </div>

      <div className="flex w-full">
        <Button variant={"secondary"} width={"full"}>
          Paiement
        </Button>
      </div>

      <div className="relative mb-10">
        <input
          className="z-10 bg-white w-full p-2 rounded-lg shadow outline-0 focus:shadow-md transition"
          placeholder="Entrez le montant"
        />
        <div className="-z-10 absolute top-1/2 bg-green-300 w-46 pt-6 pb-2 flex justify-center rounded-b-xl">
          <p>monnaie: 2 600 ar</p>
        </div>
      </div>

      <div className="flex w-full">
        <Button variant={"secondary"} width={"full"}>
          Enregistrer
        </Button>
      </div>

    </div>
  )
}
export default NewSaleForm
