import {Mars, Venus} from "lucide-react";
import {timeAgo} from "../../../shared/utils/dateUtils.ts";
import {useNavigate} from "react-router-dom";

type Props = {
  data: {
    id: number
    name: string
    gender: "male" | "female"
    checkup: "examination" | "appointment"
    createdAt: Date
  }
}

const PatientCard = ({data}: Props) => {

  const navigate = useNavigate()

  const iconStyle = `absolute bottom-0 left-2 h-8 w-8 p-1 translate-y-1/2 rounded-full ${data.gender === "male" ? "bg-sky-100 text-sky-500 rounded-tr-md" : "bg-pink-100 text-pink-500"}`

  const handleClick = () => {
    const link = `?container=drawer&content=patient&id=${data.id}`

    navigate(link)
  }

  return (
    <div
      onClick={handleClick}
      className="p-2 cursor-pointer h-full border border-gray-300 min-w-36 rounded-2xl overflow-hidden shadow-md shadow-transparent hover:shadow-black/10 transition"
    >
      <div className={`relative h-8 rounded-lg w-full border-2 ${data.checkup === "appointment" ? "bg-cyan-200 border-emerald-400" : "bg-fuchsia-200 border-fuchsia-400"}`}>

        {data.gender === "male" ? <Mars className={iconStyle}/> : <Venus className={iconStyle}/>}

      </div>
      <div className="mt-6 px-2 text-xs font-semibold truncate">
        {data.name}
      </div>
      <div className="text-xs text-gray-400 mt-4 ml-2">
        {timeAgo(data.createdAt)}
      </div>
    </div>
  )
}
export default PatientCard
