import {useState} from "react";
import server, {type ApiResponse} from "../../../shared/services/api.ts";
import {type userInfoType, useUserInfoStore} from "../../../shared/store/userInfoStore.ts";
import {useNavigate, useSearchParams} from "react-router-dom";

const useAuthentication = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const [params] = useSearchParams()
  const navigate = useNavigate()

  const from = params.get("from") || "/"

  const createInfo = useUserInfoStore(state => state.createInfo)
  const deleteInfo = useUserInfoStore(state => state.deleteInfo)

  const verifyCredentials = (email?: string, password?: string) => {
    if (!email || !password) throw new Error("All fields are required")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }

    // check password length
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }
  }

  const signIn = async ( payload : { email: string, password: string }) => {

    try {
      setError("")
      setLoading(true)

      verifyCredentials(payload.email, payload.password)

      const response = await server.post<ApiResponse<userInfoType>>("/api/v1/auth/sign-in", {
        email: payload.email,
        password: payload.password
      })

      const data = response.data.data

      createInfo(data)

      navigate(from, { replace: true })

    } catch (e: any) {

      const message =
        e?.response?.data?.error ||
        e?.message ||
        "An unexpected error occurred.";

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    deleteInfo()

    navigate("/auth/sign-in", { replace: true })
  }

  return { signIn, signOut, loading, verifyCredentials, error }
}
export default useAuthentication
