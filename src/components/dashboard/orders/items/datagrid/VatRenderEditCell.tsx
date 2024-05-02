import React, { useEffect, useRef, useState } from "react"
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid"
import log from "@/utils/log"
import { getAndSetVatRates } from "@/utils/axiosCalls"
import SpinLoader from "@/components/_common/SpinLoader"

const VatRenderEditCell = (props: GridRenderEditCellParams) => {
  const { id, value, field, hasFocus } = props
  const apiRef = useGridApiContext()
  const ref = useRef<HTMLSelectElement | null>(null)

  const [vatRates, setVatRates] = useState<number[]>([])

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value
    if (value === newValue) return

    apiRef.current.setEditCellValue({
      id,
      field,
      value: Number.parseFloat(newValue),
    })
  }

  React.useLayoutEffect(() => {
    if (hasFocus && ref.current) {
      ref.current.focus()
    }
  }, [hasFocus])

  useEffect(() => {
    getAndSetVatRates(setVatRates)
  }, [])

  return (
    <>
      {vatRates.length === 0 ? (
        <SpinLoader />
      ) : (
        <select
          className="w-full"
          ref={ref}
          onChange={handleValueChange}
          defaultValue={Number.parseFloat(value)}
        >
          {vatRates.map((rate: number) => (
            <option
              key={rate}
              value={rate}
            >
              {rate * 100}%
            </option>
          ))}
        </select>
      )}
    </>
  )
}
export default VatRenderEditCell
