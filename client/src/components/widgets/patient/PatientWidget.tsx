import WidgetContainer from "../WidgetContainer.tsx";
import { FileUser } from "lucide-react";
import Carousel from "../../ui/carousel/Carousel.tsx";
import PatientCard from "./PatientCard.tsx";

const patients: {
  id: number
  name: string
  gender: "male" | "female"
  checkup: "examination" | "appointment"
  createdAt: Date
}[] = [
  {
    id: 1,
    name: "Jean Rakoto",
    gender: "male",
    checkup: "examination",
    createdAt: new Date("2025-09-20"),
  },
  {
    id: 2,
    name: "Sarah Randria",
    gender: "female",
    checkup: "appointment",
    createdAt: new Date("2025-09-22"),
  },
  {
    id: 3,
    name: "Hery Andrianina",
    gender: "male",
    checkup: "examination",
    createdAt: new Date("2025-09-25"),
  },
  {
    id: 4,
    name: "Mialy Rasoa",
    gender: "female",
    checkup: "appointment",
    createdAt: new Date("2025-09-26"),
  },
  {
    id: 5,
    name: "Tojo Rabe",
    gender: "male",
    checkup: "appointment",
    createdAt: new Date("2025-09-28"),
  },
  {
    id: 6,
    name: "Fanja Rasoanaivo",
    gender: "female",
    checkup: "examination",
    createdAt: new Date("2025-09-30"),
  },
];

const PatientWidget = () => {
  return (
    <WidgetContainer title="Patients" icon={FileUser}>
      <div className="w-full h-36">
        <Carousel>
          {patients.length > 0 && patients.map(patient => (
            <PatientCard data={patient}/>
          ))}
        </Carousel>
      </div>
    </WidgetContainer>
  );
};

export default PatientWidget;
