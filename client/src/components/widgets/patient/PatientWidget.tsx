import WidgetContainer from "../WidgetContainer.tsx";
import { FileUser } from "lucide-react";
import Carousel from "../../ui/carousel/Carousel.tsx"; // par exemple dans src/components/ui/Carousel.tsx

const PatientWidget = () => {
  return (
    <WidgetContainer title="Patients" icon={FileUser}>
      <div className="w-full h-32">
        <Carousel>
          <div className="h-full bg-red-300 min-w-32 flex items-center justify-center rounded">
            Carte 1
          </div>
          <div className="h-full bg-red-300 min-w-32 flex items-center justify-center rounded">
            Carte 2
          </div>
          <div className="h-full bg-red-300 min-w-32 flex items-center justify-center rounded">
            Carte 3
          </div>
          <div className="h-full bg-red-300 min-w-32 flex items-center justify-center rounded">
            Carte 4
          </div>
          <div className="h-full bg-red-300 min-w-32 flex items-center justify-center rounded">
            Carte 5
          </div>
        </Carousel>
      </div>
    </WidgetContainer>
  );
};

export default PatientWidget;
