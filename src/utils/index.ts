import React from "react"
import { produce } from "immer"
import { AxiosError, AxiosResponse } from "axios"
import log from "@/utils/log"
import dayjs, { Dayjs } from "dayjs"
import isEqual from "lodash.isequal"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import nav, { RouterParam } from "@/router"
import { httpStatusE } from "@/types/enums"
import { setNotificationT, UserT } from "@/types"
import texts from "@/texts"
import doAxios from "@/utils/doAxios"
import { SelectChangeEvent } from "@mui/material"

export const handleChangeData = <T>(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setter: React.Dispatch<React.SetStateAction<T>>
) => {
  const id = event.target.id
  const value = event.target.value

  const htmlInputEvent =
    event.target.tagName.toLowerCase() === "input"
      ? (event as React.ChangeEvent<HTMLInputElement>)
      : undefined
  const file =
    htmlInputEvent && htmlInputEvent.target.files
      ? htmlInputEvent.target.files[0]
      : undefined

  setter(
    produce((draft: any) => {
      draft && (draft[id] = (file ?? value) as never)
    })
  )
}

export const handleResData = <T>(
  response: AxiosResponse,
  setter: React.Dispatch<React.SetStateAction<T>>
): string | null => {
  setter(
    produce((draft: any) => {
      return response.data.data
    })
  )
  return response.data.message
}

export const handleInputErrors = <T>(
  error: AxiosError,
  setter: React.Dispatch<React.SetStateAction<T>>
) => {
  const errData = error.response?.data as {
    errors: { [key: string]: string[] }
  }
  const { errors } = errData

  if ("password" in errors) {
    errors["password_confirmation"] = errors["password"].filter((str) =>
      str.toLowerCase().includes("confirm")
    )
    errors["password"] = errors["password"].filter(
      (str) => !str.toLowerCase().includes("confirm")
    )
  }

  setter(
    produce((draft: any) => {
      return errors
    })
  )
}

export const handleInputDefaultErrors = <T>(
  defaultState: T,
  setter: React.Dispatch<React.SetStateAction<T>>
) => {
  setter(
    produce((draft: any) => {
      return defaultState
    })
  )
}

export const formatDate = (datetime: Date | Dayjs): string => {
  if (dayjs.isDayjs(datetime)) {
    datetime = datetime.toDate()
  }

  const year = datetime.getFullYear().toString().padStart(4, "0")
  const month = (datetime.getMonth() + 1).toString().padStart(2, "0")
  const day = datetime.getDate().toString().padStart(2, "0")

  const hours = datetime.getHours().toString().padStart(2, "0")
  const minutes = datetime.getMinutes().toString().padStart(2, "0")
  const seconds = datetime.getSeconds().toString().padStart(2, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const hasDistinctValues = (
  checkingArray: (string | number)[],
  validValues: (string | number)[]
): boolean => {
  if (checkingArray.length !== validValues.length) return false

  const validValuesSet = new Set(validValues)

  return checkingArray.every((value) => validValuesSet.has(value))
}

export const areObjectsEqual = (object1: object, object2: object): boolean => {
  return isEqual(object1, object2)
}

export const formDataToJson = (formData: FormData) => {
  return Object.fromEntries(formData.entries())
}

export const buildFilesFormData = (
  data: object,
  ignoredFileKeys?: string[]
): FormData => {
  const formData = new FormData()

  if (ignoredFileKeys) {
    for (const key in data) {
      const value = (data as Record<string, any>)[key]

      if (!(ignoredFileKeys.includes(key) && !(value instanceof File))) {
        formData.append(key, value)
      }
    }
  } else {
    for (const key in data) {
      const value = (data as Record<string, any>)[key]
      formData.append(key, value)
    }
  }

  return formData
}

export const handleForbiddenAccess = (
  errorOrResponse: AxiosError | AxiosResponse,
  notifSetter: setNotificationT,
  router: AppRouterInstance,
  route: string,
  routerParams?: RouterParam
) => {
  const isError = errorOrResponse instanceof AxiosError

  if (isError && errorOrResponse.response?.status === httpStatusE.FORBIDDEN) {
    nav(route, router, true, routerParams)
    const errData = errorOrResponse.response.data as { message: string }
    notifSetter(errData.message, "error")
  } else if (!isError) {
    const hasAccess: boolean | null = errorOrResponse.data.data?.has_access
      ? errorOrResponse.data.data.has_access
      : null

    if (hasAccess) return

    nav(route, router, true, routerParams)
    notifSetter(texts.notification.errors.access_denied, "error")
  }
}

export const getUserAvatar = (user?: UserT | null) => {
  return user?.avatar?.image && process.env.NEXT_PUBLIC_API_BASE_URL
    ? process.env.NEXT_PUBLIC_API_BASE_URL + "/" + user.avatar.image
    : undefined
}

export const getUserInitials = (fullName: string) => {
  const parts = fullName.split(" ")
  const initials = parts.map((part) => {
    return part.substring(0, 1).toUpperCase()
  })
  return initials.toString().replace(/,/g, "")
}

export const generateFileName = (name: string): string => {
  return name.replace(/[^a-zA-Z0-9]/g, "_")
}

export const handlePdfDownload = (
  requestPath: string,
  documentName: string | number
): undefined | string => {
  let errMessage: string | undefined = undefined
  doAxios(requestPath, "get", true, undefined, undefined, "blob")
    .then((res) => {
      const aTag = document.createElement("a")
      aTag.href = URL.createObjectURL(new Blob([res.data]))
      aTag.download = generateFileName(`${documentName}`) + ".pdf"
      aTag.click()
      URL.revokeObjectURL(aTag.href)
      aTag.remove()
    })
    .catch((err) => {
      errMessage = err.response.data.message
    })
  return errMessage
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which are by default in the \u03xx UNICODE block
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // remove consecutive hyphens
}

export const handleDaytimeChange = (
  daytime: Dayjs | null,
  setter:
    | React.Dispatch<React.SetStateAction<Dayjs>>
    | React.Dispatch<React.SetStateAction<Dayjs | undefined>>
) => {
  if (!daytime) return

  setter(daytime)
}

export const handleSelectChange = <T>(
  event: SelectChangeEvent<string | number>,
  setter: React.Dispatch<React.SetStateAction<T>>,
  setAsNumber: boolean = false
) => {
  const {
    target: { value },
  } = event
  setter(
    produce((draft: any) => {
      return (setAsNumber ? [value].map(Number) : [value].map(String))[0]
    })
  )
}

export const handleMultiSelectChange = <T>(
  event: SelectChangeEvent<string[]>,
  setter: React.Dispatch<React.SetStateAction<T>>,
  setAsNumber: boolean = false
) => {
  const {
    target: { value },
  } = event
  setter(
    produce((draft: any) => {
      return setAsNumber
        ? typeof value === "string"
          ? value.split(",").map(Number)
          : value.map(Number)
        : typeof value === "string"
          ? value.split(",").map(String)
          : value
    })
  )
}
