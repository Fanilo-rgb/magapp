import WidgetContainer from "../WidgetContainer.tsx";
import { FileUser } from "lucide-react";
import Carousel from "../../ui/carousel/Carousel.tsx";
import PatientCard from "./PatientCard.tsx";
import {useMemo} from "react";

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
    checkup: "examination",
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

  const examinationCount = useMemo(
    () => patients.filter(p => p.checkup === "examination").length,
    [patients]
  )

  const appointmentCount = useMemo(
    () => patients.filter(p => p.checkup === "appointment").length,
    [patients]
  )

  const header = (
    <div className="flex gap-2 items-center font-semibold text-gray-700">
      <div className="bg-fuchsia-200 border-2 border-fuchsia-400 rounded-lg px-2 py-0.5">
        {examinationCount}
      </div>
      <div className="bg-cyan-200 border-2 border-emerald-400 rounded-lg px-2 py-0.5">
        {appointmentCount}
      </div>
    </div>
  )

  return (
    <WidgetContainer title="Patients" icon={FileUser} header={header} buttonLink="?container=drawer&content=newPatient">
      <div className="w-full h-36">
        <Carousel>
          {patients.length > 0 && patients.map(patient => (
            <PatientCard key={patient.id} data={patient}/>
          ))}
        </Carousel>
      </div>
    </WidgetContainer>
  );
};

export default PatientWidget;
