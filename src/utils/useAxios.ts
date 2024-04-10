import axios from "axios"
import { useRouter } from "next/router"

const useAxios = (
  url: string,
  method:
    | "get"
    | "GET"
    | "post"
    | "POST"
    | "put"
    | "PUT"
    | "patch"
    | "PATCH"
    | "delete"
    | "DELETE" = "get",
  api: boolean = false,
  data?: object,
  headers?: object
) => {
  const router = useRouter()

  return axios({
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "//localhost" + api ? "/api" : "",
    withCredentials: true,
    withXSRFToken: true,
    method,
    url,
    data,
    headers: headers,
  }).catch((error) => {
    if (error.response?.status == 404) {
      router.push("404")
    }

    throw error
  })
}

export default useAxios
