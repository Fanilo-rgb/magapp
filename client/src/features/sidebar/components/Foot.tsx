import Button from "../../../shared/components/buttons/Button.tsx";
import {Info} from "lucide-react";

type FootProps = {
  email: string
  role: string
}

const Foot = ({ email, role }: FootProps) => {
  return (
    <div className="flex gap-2 w-full">
      <div className="rounded-lg bg-white hover:bg-green-100 shadow p-1 flex flex-1 gap-2 justify-between items-center text-xs cursor-pointer transition">
        <p className="max-w-34 truncate">{email}</p>
        <div className="bg-cyan-200 text-cyan-800 w-fit px-1 py-0.5 rounded text-nowrap">
          {role}
        </div>
      </div>
      <Button icon={Info}/>
    </div>
  )
}
export default Foot
