import React from "react"
import { produce } from "immer"
import { AxiosError, AxiosResponse } from "axios"
import log from "@/utils/log"
import dayjs, { Dayjs } from "dayjs"

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
  setter(
    produce((draft: any) => {
      const errData = error.response?.data as {
        errors: { [key: string]: string[] }
      }
      return errData.errors
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

type Initializer<T> = {
  [K in keyof T]: undefined extends T[K] ? string[] | undefined : never
}

const initializeArray = <T>(type: T[]): Initializer<T> => {
  return Object.fromEntries(
    Object.entries(type).map(([key, value]) => [
      key,
      Array.isArray(value) || value === undefined ? value : [value],
    ])
  ) as Initializer<T>
}
