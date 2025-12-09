import ChoicesList from "../../../shared/components/inputs/ChoicesList.tsx";
import type {Label} from "../../../shared/types/types.ts";
import Button from "../../../shared/components/buttons/Button.tsx";
import {Pen} from "lucide-react";
import {useSearchParams} from "react-router-dom";
import useProduct from "../hooks/useProduct.tsx";

const ProductView = () => {

  const [params] = useSearchParams()
  const productId = params.get("id")
  const { products, getLabel } = useProduct()

  const product = products.find(product => product._id === productId)

  if (!product) return <div>Product not found</div>

  const { name, bv, order, type, price: rawPrice } = product

  const price = rawPrice.toLocaleString()

  const detailsPrice = (rawPrice * 1.2).toLocaleString()

  const productType: Label[] = getLabel(type)

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold">#{order}</span>
        <Button icon={Pen} text="sm">
          Modifier
        </Button>
      </div>

      <div>
        <p className="w-full text-lg font-semibold py-1">
          {name}
        </p>
      </div>

      <div className="flex flex-col gap-2">

        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Pseudo du produit</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-0"
            placeholder="Nom du produit"
            value={name}
            readOnly
          />
        </div>

        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Bv</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-0"
            placeholder="Nom du produit"
            value={bv}
            readOnly
          />
        </div>

        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Prix distributeur</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-0"
            placeholder="Nom du produit"
            value={price}
            readOnly
          />
        </div>

        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Prix client</p>
          <input
            type="text"
            className="w-full py-1 px-2 border border-gray-300 rounded-md outline-0"
            placeholder="Nom du produit"
            value={detailsPrice}
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

      <hr/>

      <div>
        <p className="pb-2 pl-2 text-gray-500 text-xs">Mode de consommation</p>
        <div className="flex gap-2 text-xs text-gray-400 font-semibold">
          <div className="flex-1 py-1 text-center">matin</div>
          <div className="flex-1 py-1 text-center">midi</div>
          <div className="flex-1 py-1 text-center">soir</div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-blue-200 text-blue-800 py-1 text-center rounded-md">1 tasse</div>
          <div className="flex-1 bg-blue-200 text-blue-800 py-1 text-center rounded-md">1 tasse</div>
          <div className="flex-1 bg-blue-200 text-blue-800 py-1 text-center rounded-md">1 tasse</div>
        </div>
        <p className="mt-2 bg-yellow-200 text-yellow-800 py-1 text-center rounded-md w-full">Avant repas</p>
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

      <hr/>

      <div className="pl-5 text-gray-400 font-semibold">
        Details du produit
      </div>

      <div className="flex flex-col gap-2 select-none">
        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Description</p>
          <p className="text-justify p-2 text-sm">
            Le Kuding Plus Tea est une boisson traditionnelle chinoise réputée pour ses nombreux bienfaits pour la santé. Fabriqué à partir de feuilles de Kuding, ce thé est apprécié pour son goût amer unique et ses propriétés médicinales. Il est souvent consommé pour améliorer la digestion, réduire le stress et favoriser la perte de poids. Riche en antioxydants, le Kuding Plus Tea aide également à renforcer le système immunitaire et à détoxifier l'organisme. Que ce soit chaud ou froid, ce thé est une excellente option pour ceux qui cherchent à allier plaisir et bien-être au quotidien.
          </p>
        </div>
        <div>
          <p className="pb-2 pl-2 text-gray-500 text-xs">Specification</p>
          <p className="text-justify p-2 text-sm">
            20 sachet x 2g
          </p>
        </div>
      </div>

    </div>
  )
}
export default ProductView
