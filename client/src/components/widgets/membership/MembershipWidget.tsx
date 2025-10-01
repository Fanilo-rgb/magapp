import WidgetContainer from "../WidgetContainer.tsx";
import {Banknote, CircleUserRound, ClipboardPen} from "lucide-react";
import ApplicationItem from "./ApplicationItem.tsx";
import {useEffect, useMemo, useState} from "react";
import LimitButton from "../../ui/buttons/LimitButton.tsx";

type variant = "close" | "open"

const applications = [
  {
    id: 1,
    applicant: { name: "Razanah Andrianina", numberCard: "18004001" },
    upLine:    { name: "Tiana Rakoto",        numberCard: "18004002" },
    sponsor:   { name: "Fetra Rajaonarison",  numberCard: "18004003" },
    createdAt: new Date("2025-09-25T09:12:00Z")
  },
  {
    id: 2,
    applicant: { name: "Miora Randria",      numberCard: "18004004" },
    upLine:    { name: "Hery Andrianarivo",  numberCard: "18004005" },
    sponsor:   { name: "Sitraka Rasoanaivo", numberCard: "18004006" },
    createdAt: new Date("2025-09-26T11:30:00Z")
  },
  {
    id: 3,
    applicant: { name: "Faly Rabetokotany",  numberCard: "18004007" },
    upLine:    { name: "Ravoarimampianina",  numberCard: "18004008" },
    sponsor:   { name: "Hasina Randrianarivony", numberCard: "18004009" },
    createdAt: new Date("2025-09-26T14:05:00Z")
  },
  {
    id: 4,
    applicant: { name: "Narindra Solo",      numberCard: "18004010" },
    upLine:    { name: "Lalao R.",           numberCard: "18004011" },
    sponsor:   { name: "Bodo Razafy",        numberCard: "18004012" },
    createdAt: new Date("2025-09-27T08:45:00Z")
  },
  {
    id: 5,
    applicant: { name: "Tovo Lalaina",       numberCard: "18004013" },
    upLine:    { name: "Mamy Andriamatoa",   numberCard: "18004014" },
    sponsor:   { name: "Voahirana",          numberCard: "18004015" },
    createdAt: new Date("2025-09-27T13:22:00Z")
  },
  {
    id: 6,
    applicant: { name: "Sofia R.",           numberCard: "18004016" },
    upLine:    { name: "Joel Rakotomahenina",numberCard: "18004017" },
    sponsor:   { name: "Nirina",             numberCard: "18004018" },
    createdAt: new Date("2025-09-28T10:00:00Z")
  },
  {
    id: 7,
    applicant: { name: "Mickaël F.",         numberCard: "18004019" },
    upLine:    { name: "Esther Razanadrakoto", numberCard: "18004020" },
    sponsor:   { name: "Tsiory",             numberCard: "18004021" },
    createdAt: new Date("2025-09-28T16:40:00Z")
  },
  {
    id: 8,
    applicant: { name: "Anja R.",            numberCard: "18004022" },
    upLine:    { name: "Zo Rakotomalala",    numberCard: "18004023" },
    sponsor:   { name: "Mialy",              numberCard: "18004024" },
    createdAt: new Date("2025-09-29T07:15:00Z")
  },
  {
    id: 9,
    applicant: { name: "Bekoto Andriam",     numberCard: "18004025" },
    upLine:    { name: "Hanta",              numberCard: "18004026" },
    sponsor:   { name: "Feno",               numberCard: "18004027" },
    createdAt: new Date("2025-09-29T12:50:00Z")
  },
  {
    id: 10,
    applicant: { name: "Rija Solofo",        numberCard: "18004028" },
    upLine:    { name: "Miora Tahina",       numberCard: "18004029" },
    sponsor:   { name: "Ando",               numberCard: "18004030" },
    createdAt: new Date("2025-09-30T06:05:00Z")
  }
];

const MembershipWidget = () => {

  const [limit, setLimit] = useState(0)
  const [variant, setVariant] = useState<variant>("open")

  useEffect(() => {
    setLimit(applications.length > 4 ? 4 : applications.length)
  }, [applications])

  const membershipValue = useMemo(
    () => applications.length * 40_000,
    [applications]
  )

  const list = applications.slice(0, limit)

  const header = (
    <div className="flex gap-2">
      <div className="flex items-center gap-2">
        <CircleUserRound size={16}/>
        <span className="font-semibold text-gray-500">{applications.length}</span>
      </div>
      <span className="verticalDivider" />
      <div className="flex items-center gap-2">
        <Banknote size={16}/>
        <span className="font-semibold text-gray-500">{membershipValue.toLocaleString()} ar</span>
      </div>
    </div>
  )

  const handleClick = () => {
    const l = limit < applications.length ? limit + 3 : 4

    setLimit(l)
    setVariant(l === applications.length ? "close" : "open")
  }

  return (
    <WidgetContainer title="Adhésion" icon={ClipboardPen} header={header}>
      <div className="flex flex-col gap-2">
        {applications.length > 0 && list.map(application => (
          <ApplicationItem key={application.id} data={application}/>
        ))}
      </div>
      {applications.length > 4 && (
        <LimitButton onClick={handleClick} variant={variant}/>
      )}
    </WidgetContainer>
  )
}
export default MembershipWidget
