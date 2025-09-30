import IconButton from "../../ui/buttons/IconButton.tsx";
import {Ellipsis} from "lucide-react";
import {formatNumber} from "../../../utils/formatNumber.ts";

type Props = {
  data: {
    id: number
    applicant: {
      name: string
      numberCard: string
    }
    upLine: {
      name: string
      numberCard: string
    }
    sponsor: {
      name: string
      numberCard: string
    }
    createdAt: Date
  }
}

const ApplicationItem = ({data}: Props) => {

  const numberCard = formatNumber(data.applicant.numberCard, [2, 2, 2, 2])

  return (
    <div
      className="h-8 sm:h-10 flex justify-between items-center cursor-pointer border shadow shadow-transparent hover:shadow-black/20 border-gray-300 p-1 sm:p-2 rounded-xl transition gap-2"
    >
      <div className="flex gap-2 pl-1">
        <span className="w-20 text-center">{numberCard}</span>
        <span className="verticalDivider" />
        <span className="truncate">{data.applicant.name}</span>
      </div>
      <IconButton icon={Ellipsis}/>
    </div>
  )
}

export default ApplicationItem
