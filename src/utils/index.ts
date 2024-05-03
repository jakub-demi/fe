import React from "react"
import { produce } from "immer"
import { AxiosError, AxiosResponse } from "axios"
import log from "@/utils/log"
import dayjs, { Dayjs } from "dayjs"
import isEqual from "lodash.isequal"

export const handleChangeData = <T>(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setter: React.Dispatch<React.SetStateAction<T>>
) => {
  const id = event.target.id
  const value = event.target.value

  setter(
    produce((draft: any) => {
      draft && (draft[id] = value as never)
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
