import axios, { AxiosHeaders, AxiosPromise, ResponseType } from "axios"
import { getRoute } from "@/router"
import { httpStatusE } from "@/types/enums"
import log from "@/utils/log"

const doAxios = (
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
  headers?: AxiosHeaders,
  responseType?: ResponseType
): AxiosPromise => {
  return axios({
    baseURL:
      (process.env.NEXT_PUBLIC_API_BASE_URL ?? "//localhost") +
      (api ? "/api" : ""),
    withCredentials: true,
    withXSRFToken: true,
    method,
    url,
    data,
    headers: headers,
    responseType: responseType,
  }).catch((error) => {
    if (error.response?.status == httpStatusE.NOT_FOUND) {
      window.location.replace(getRoute("e404"))
    }

    if (
      process.env.NEXT_PUBLIC_DEV_ENV &&
      process.env.NEXT_PUBLIC_DEV_ENV === "true"
    ) {
      log("doAxios error", error)
    }

    throw error
  })
}

export default doAxios
