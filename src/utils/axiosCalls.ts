import log from "@/utils/log"
import doAxios from "@/utils/doAxios"
import React from "react"
import { produce } from "immer"

export const getAndSetVatRates = (
  setter: React.Dispatch<React.SetStateAction<number[]>>,
  multiply: boolean = false
) => {
  let data = [] as number[]
  doAxios("/vat-rates", "get", true)
    .then((res) => {
      data = res.data.data as number[]

      if (!multiply) return

      data = data.map((rate: number) => {
        return rate * 100
      })
    })
    .finally(() => {
      setter(
        produce((draft) => {
          return data
        })
      )
    })
}
