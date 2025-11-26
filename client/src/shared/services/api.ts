import axios, {type AxiosError} from "axios"

export interface ApiResponse<T> {
  data: T;
  success: number;
  message?: string
}

const server = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
})

server.interceptors.response.use(
  (res ) => res,
  (err: AxiosError) => {
    console.log(`Message: ${err.message}, status Code: ${err.status}`)
    console.log("Server response : \n")
    const serverResponse = err.response?.data as { success: boolean, error: string } | undefined
    console.log(serverResponse)
    return Promise.reject(err as AxiosError)
  }
)

export default server
