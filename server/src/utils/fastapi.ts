import axios from "axios"
import {FASTAPI_URL} from "../constants/env";

const fastapi = axios.create({
  baseURL: FASTAPI_URL,
})

export default fastapi