import axios, {type AxiosError} from "axios"
import {redirect} from "react-router-dom";
import {useUserInfoStore} from "../store/userInfoStore.ts";

export interface ApiResponse<T> {
  data: T;
  success: number;
  message?: string
}

const server = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
})

server.interceptors.request.use(
  (config) => {
    const token = useUserInfoStore(state => state.getToken())

    if (token !== "") config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (err) => {
    return Promise.reject(err);
  }
)

server.interceptors.response.use(

  (res ) => res,

  (err: AxiosError) => {
    const serverResponse = err.response?.data as { success: boolean, error: string } | undefined

    console.log(`Message: ${err.message}, status Code: ${err.status}`)
    console.log("Server response : \n")
    console.log(serverResponse)

    const tokenIsExpired = err.status === 500 && serverResponse && serverResponse.error === "jwt expired"

    if (tokenIsExpired) redirect("/auth/sign-in")

    return Promise.reject(err as AxiosError)
  }
)

export default server
