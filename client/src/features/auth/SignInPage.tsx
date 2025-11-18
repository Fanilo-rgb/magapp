import Button from "../../shared/components/buttons/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Eye, EyeClosed} from "lucide-react";
import {useState} from "react";

const SignInPage = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  const handleSignIn = () => {
    navigate("/")
  }

  return (
    <div className="h-full w-lg lg:w-2xl flex items-center justify-center bg-white/50 shadow-2xl">
      <div className="p-6 min-w-full sm:min-w-sm">
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="text-2xl font-bold text-center">MaGApp</h1>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="pb-2 text-xs text-gray-600 pl-2">Email</label>
            <input
              id="email"
              className="bg-white rounded-xl outline-2 outline-transparent focus:outline-cyan-300 transition p-2"
              type="email"
              placeholder="exemple@gmail.com"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="pb-2 text-xs text-gray-600 pl-2">Mot de passe</label>
            <div className="relative flex flex-col">
              <input
                id="password"
                className="bg-white rounded-xl outline-2 outline-transparent focus:outline-cyan-300 transition p-2"
                type={ show ? "text" : "password" }
                placeholder="Votre mot de passe"
              />
              <Button
                className="absolute right-2 top-1/2 -translate-y-1/2"
                width="fit"
                icon={ show ? EyeClosed : Eye }
                onClick={handleShow}
              />
            </div>
          </div>
          <Button
            className="py-2 bg-slate-700 hover:bg-slate-800 rounded-2xl"
            variant="secondary"
            width="full"
            onClick={handleSignIn}
          >
            Se connecter
          </Button>
        </div>
        <hr className="mb-4 mt-6"/>
        <p className="text-center text-sm text-gray-600">
          Pas encore de compte ? <Link to="/auth/sign-up" className="font-semibold hover:text-blue-800 transition">Inscriver vous</Link>
        </p>
        <p className="mt-4 text-center text-xs cursor-pointer text-gray-500 hover:underline hover:text-gray-800 transition">mot de passe oublier</p>
      </div>
    </div>
  )
}
export default SignInPage
