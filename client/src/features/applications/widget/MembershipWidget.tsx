import WidgetContainer from "../../../shared/components/WidgetContainer.tsx";
import { Banknote, CircleUserRound, ClipboardPen } from "lucide-react";
import ApplicationItem from "./ApplicationItem.tsx";
import { useMemo } from "react";
import LimitButton from "../../../shared/components/buttons/LimitButton.tsx";
import { useLimitList } from "../../../shared/hooks/useLimitList.ts"

const applications = [
  {
    id: 1,
    applicant: { name: "Razanah Andrianina", numberCard: "18004001" },
    upLine: { name: "Tiana Rakoto", numberCard: "18004002" },
    sponsor: { name: "Fetra Rajaonarison", numberCard: "18004003" },
    createdAt: new Date("2025-09-25T09:12:00Z"),
  },
  {
    id: 2,
    applicant: { name: "Miora Randria", numberCard: "18004004" },
    upLine: { name: "Hery Andrianarivo", numberCard: "18004005" },
    sponsor: { name: "Sitraka Rasoanaivo", numberCard: "18004006" },
    createdAt: new Date("2025-09-26T11:30:00Z"),
  },
  {
    id: 3,
    applicant: { name: "Faly Rabetokotany", numberCard: "18004007" },
    upLine: { name: "Ravoarimampianina", numberCard: "18004008" },
    sponsor: { name: "Hasina Randrianarivony", numberCard: "18004009" },
    createdAt: new Date("2025-09-26T14:05:00Z"),
  },
  {
    id: 4,
    applicant: { name: "Narindra Solo", numberCard: "18004010" },
    upLine: { name: "Lalao R.", numberCard: "18004011" },
    sponsor: { name: "Bodo Razafy", numberCard: "18004012" },
    createdAt: new Date("2025-09-27T08:45:00Z"),
  },
  {
    id: 5,
    applicant: { name: "Tovo Lalaina", numberCard: "18004013" },
    upLine: { name: "Mamy Andriamatoa", numberCard: "18004014" },
    sponsor: { name: "Voahirana", numberCard: "18004015" },
    createdAt: new Date("2025-09-27T13:22:00Z"),
  },
];

const MembershipWidget = () => {
  const { sliced, variant, handleClick, bottomRef } = useLimitList(applications);

  const membershipValue = useMemo(
    () => applications.length * 40_000,
    [applications]
  );

  const header = (
    <div className="flex gap-2">
      <div className="flex items-center gap-2">
        <CircleUserRound size={16} />
        <span className="font-semibold text-gray-500">{applications.length}</span>
      </div>
      <span className="verticalDivider" />
      <div className="flex items-center gap-2">
        <Banknote size={16} />
        <span className="font-semibold text-gray-500">
          {membershipValue.toLocaleString()} ar
        </span>
      </div>
    </div>
  );

  return (
    <WidgetContainer
      title="Adhésion"
      icon={ClipboardPen}
      header={header}
      buttonLink="?container=drawer&content=newApplication"
    >
      <div className="flex flex-col gap-2">
        {sliced.map((application) => (
          <ApplicationItem key={application.id} data={application} />
        ))}
      </div>
      <div ref={bottomRef} />
      {applications.length > 4 && (
        <LimitButton onClick={handleClick} variant={variant} />
      )}
    </WidgetContainer>
  );
};

export default MembershipWidget;
