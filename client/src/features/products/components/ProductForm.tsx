import ChoicesList from "../../../shared/components/inputs/ChoicesList.tsx";
import type {Label} from "../../../shared/types/types.ts";
import Button from "../../../shared/components/buttons/Button.tsx";

const ProductForm = () => {
  const productChoices: Label[] = [
    { value: "tea", placeholder: "Thé", color: "green" },
    { value: "capsule", placeholder: "Gélule", color: "blue" },
    { value: "powder", placeholder: "Poudre", color: "yellow" },
    { value: "plaster", placeholder: "Plâtre", color: "purple" },
    { value: "compressed", placeholder: "Comprimé", color: "red" },
    { value: "pill", placeholder: "Pilule", color: "pink" },
    { value: "candy", placeholder: "Bonbons", color: "orange" }
  ]

  const consumptionChoices: Label[] = [
    { value: "before", placeholder: "Avant", color: "gray" },
    { value: "during", placeholder: "Pendant", color: "gray" },
    { value: "after", placeholder: "Après", color: "gray" }
  ]

  return (
    <div className="relative flex flex-col gap-4">
      <div>
        <input
          type="text"
          spellCheck={false}
          className="outline-0 w-full text-lg font-semibold py-1 hover:placeholder:tracking-wider placeholder:font-light placeholder:text-gray-400"
          placeholder="Nom du produit *"
        />
      </div>

      <div className="flex flex-col gap-2">

        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Pseudo du produit</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-2 outline-transparent focus:outline-cyan-400 transition"
            placeholder="Nom du produit"
            spellCheck={false}
          />
        </div>

        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Bv</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-2 outline-transparent focus:outline-cyan-400 transition"
            placeholder="Bv *"
          />
        </div>

        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Prix distributeur</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-2 outline-transparent focus:outline-cyan-400 transition"
            placeholder="Prix details"
          />
        </div>
      </div>

      <hr/>

      <div className="flex flex-col gap-2">
        <ChoicesList choices={productChoices} label="Type du produit"/>

        <div className="flex items-center">
          <div className="w-44 p-1 text-gray-500">
            Nombres en stock :
          </div>
          <div className="hover:bg-black/5 p-1 flex-1 rounded transition">
            <input
              className="outline-0 pl-1 text-xs bg-white shadow rounded py-0.5 px-1"
              type="number"
              placeholder="0"
            />
          </div>
        </div>

      </div>

      <hr/>

      <div>
        <p className="pb-2 pl-2 text-gray-500 text-xs">Mode de consommation</p>
        <div className="flex gap-2 text-xs text-gray-400 font-semibold">
          <div className="flex-1 py-1 text-center">matin</div>
          <div className="flex-1 py-1 text-center">midi</div>
          <div className="flex-1 py-1 text-center">soir</div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              placeholder="0"
              className="w-full bg-blue-200 text-blue-800 py-1 text-center rounded-md outline-2 outline-transparent focus:outline-blue-500 transition"
            />
          </div>
          <div className="flex-1">
            <input
              placeholder="0"
              className="w-full bg-blue-200 text-blue-800 py-1 text-center rounded-md outline-2 outline-transparent focus:outline-blue-500 transition"
            />
          </div>
          <div className="flex-1">
            <input
              placeholder="0"
              className="w-full bg-blue-200 text-blue-800 py-1 text-center rounded-md outline-2 outline-transparent focus:outline-blue-500 transition"
            />
          </div>
        </div>
        <div className="mt-2">
          <ChoicesList choices={consumptionChoices} label="Avant/pendant/apres"/>
        </div>
      </div>

      <div>
        <p className="pb-2 pl-2 text-gray-500 text-xs">Conseil d'utilisation</p>
        <div>
          <ul className="list-disc list-inside text-justify p-2 text-sm select-none">
            <li>Faire bouillir de l'eau propre.</li>
            <li>Placer un sachet de Kuding Plus Tea dans une tasse.</li>
            <li>Verser l'eau bouillante sur le sachet.</li>
            <li>Laisser infuser pendant 1 à 3 minutes.</li>
            <li>Retirer le sachet et déguster chaud.</li>
          </ul>
        </div>
        <div>
          <p className="text-justify p-2 text-sm select-none">
            <span className="font-semibold">NB: </span>
            Un sachet peut etre utiliser jusqu'a 9 fois avant de perdre son gout. <br/>
            Au premier jour, infuser pendant 1 minute, deuxieme jour 2 minutes, troisieme jour 3 minutes.
          </p>
        </div>
      </div>

      <div className="pl-5 text-gray-400 font-semibold">
        Details du produit
      </div>

      <div className="flex flex-col gap-2 select-none">
        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Description</p>
          <textarea
            placeholder="Description du produit"
            aria-colcount={5}
            className=" h-30 w-full p-2 outline-2 outline-transparent focus:outline-cyan-400 transition rounded-lg text-xs"
          />
        </div>
        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Specification</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-2 outline-transparent focus:outline-cyan-400 transition"
            placeholder="(nombre) x (quantité) (unité) - (poids) (unité)"
          />
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
export default ProductForm
