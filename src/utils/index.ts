import React from "react"
import { produce } from "immer"
import { AxiosError, AxiosResponse } from "axios"
import log from "@/utils/log"

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
