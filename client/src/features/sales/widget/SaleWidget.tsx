import WidgetContainer from "../../../shared/components/WidgetContainer.tsx";
import {Banknote, ReceiptText} from "lucide-react";
import {useMemo} from "react";
import SaleItem from "./SaleItem.tsx";
import LimitButton from "../../../shared/components/buttons/LimitButton.tsx";
import {useLimitList} from "../../../shared/hooks/useLimitList.ts";

const sales = [
  {
    id: 1,
    isCustomer: false,
    name: "Princy Fanilo",
    products: { quantity: 2, bv: 36, totalPrice: 152200 },
    createdAt: new Date("2024-03-15T09:12:00")
  },
  {
    id: 2,
    isCustomer: false,
    name: "Tsira Andrianina",
    products: { quantity: 1, bv: 12, totalPrice: 23400 },
    createdAt: new Date("2023-11-02T14:45:00")
  },
  {
    id: 3,
    isCustomer: true,
    name: "Hery Rakotomalala",
    products: { quantity: 5, bv: 200, totalPrice: 1260100 },
    createdAt: new Date("2025-01-19T08:05:00")
  },
  {
    id: 4,
    isCustomer: true,
    name: "Miora Rasoanaivo",
    products: { quantity: 3, bv: 20, totalPrice: 48000 },
    createdAt: new Date("2024-07-30T18:22:00")
  },
  {
    id: 5,
    isCustomer: false,
    name: "Jean-Claude Razafindrakoto",
    products: { quantity: 10, bv: 5, totalPrice: 125000 },
    createdAt: new Date("2023-05-06T11:50:00")
  },
  {
    id: 6,
    isCustomer: true,
    name: "Sarobidy Andriamamonjy",
    products: { quantity: 2, bv: 40, totalPrice: 200000 },
    createdAt: new Date("2025-06-04T20:10:00")
  },
  {
    id: 7,
    isCustomer: false,
    name: "Faly Ramanantsoa",
    products: { quantity: 4, bv: 8, totalPrice: 64000 },
    createdAt: new Date("2024-12-12T07:30:00")
  },
  {
    id: 8,
    isCustomer: true,
    name: "Nirina Rakoto",
    products: { quantity: 6, bv: 15, totalPrice: 138000 },
    createdAt: new Date("2023-09-21T13:05:00")
  },
  {
    id: 9,
    isCustomer: false,
    name: "Lalao Raveloson",
    products: { quantity: 1, bv: 100, totalPrice: 50000 },
    createdAt: new Date("2025-03-27T16:40:00")
  },
  {
    id: 10,
    isCustomer: true,
    name: "Tojo Andriamananjara",
    products: { quantity: 7, bv: 7, totalPrice: 119000 },
    createdAt: new Date("2024-05-01T10:00:00")
  }
];

const SaleWidget = () => {
  const {sliced, variant, handleClick, bottomRef} = useLimitList(sales);

  const totalPrice = useMemo(
    () => sales.reduce((acc, r) => acc + r.products.totalPrice, 0),
    [sales]
  );

  const header = (
    <div className="flex items-center gap-2">
      <Banknote size={16}/>
      <span className="font-semibold text-gray-500">
        {totalPrice.toLocaleString()} ar
      </span>
    </div>
  );

  return (
    <WidgetContainer title="Achats" icon={ReceiptText} header={header} buttonLink="?container=drawer&content=newSale">
      <div className="flex flex-col gap-2">
        {sliced.map(sale => (
          <SaleItem key={sale.id} data={sale}/>
        ))}
      </div>
      <div ref={bottomRef}/>
      {sales.length > 4 && (
        <LimitButton onClick={handleClick} variant={variant}/>
      )}
    </WidgetContainer>
  );
};
export default SaleWidget
