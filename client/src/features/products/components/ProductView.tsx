import ChoicesList from "../../../shared/components/inputs/ChoicesList.tsx";
import type {Label} from "../../../shared/types/types.ts";

const ProductView = () => {

  const productType: Label[] = [{ value: "tea", placeholder: "The", color: "green" }]

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="font-semibold">#1</span>
      </div>

      <div>
        <p className="w-full text-lg font-semibold py-1">
          Kuding Plus Tea
        </p>
      </div>

      <div className="flex flex-col gap-2">

        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Pseudo du produit</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-0"
            placeholder="Nom du produit"
            value="Kuding tea"
            readOnly
          />
        </div>

        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Bv</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-0"
            placeholder="Nom du produit"
            value="12"
            readOnly
          />
        </div>

        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Prix distributeur</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-0"
            placeholder="Nom du produit"
            value="43 200"
            readOnly
          />
        </div>

        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Prix client</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-0"
            placeholder="Nom du produit"
            value="51 300"
            readOnly
          />
        </div>
      </div>

      <hr/>

      <div className="flex flex-col gap-2">
        <ChoicesList choices={productType} label="Type du produit" disable/>

        <div className="flex items-center">
          <div className="w-44 p-1 text-gray-500">
            Nombre en stock
          </div>
          <div className="p-1 flex-1 rounded transition">
            <p className="w-fit pl-1 text-xs bg-white shadow rounded py-0.5 px-1">
              24 qt
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-44 p-1 text-gray-500">
            Nombre de commande
          </div>
          <div className="p-1 flex-1 rounded transition">
            <p className="w-fit pl-1 text-xs bg-white shadow rounded py-0.5 px-1">
              3
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
export default ProductView
