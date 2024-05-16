"use client"

import React from "react"
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import cltm from "@/utils/cltm"
import log from "@/utils/log"
import { hasDistinctValues } from "@/utils"
import texts from "@/texts"
import { SelectValuesT } from "@/types"

const SelectMui = ({
  id,
  value,
  label,
  values,
  handleChange,
  error,
  specificValueDisplayFormat,
  className,
  disabled = false,
  showNothingSelected = false,
}: {
  id: string
  value?: string | number
  label: string
  values: SelectValuesT
  handleChange: (event: SelectChangeEvent) => void
  error?: string[]
  specificValueDisplayFormat?: string
  className?: string
  disabled?: boolean
  showNothingSelected?: boolean
}) => {
  const valueToDisplay = (value: string | number) => {
    return specificValueDisplayFormat
      ? specificValueDisplayFormat.replace("%v", `${value}`)
      : value
  }

  return (
    <FormControl
      className={cltm("w-full mb-2", className && `w-full mb-2 ${className}`)}
      disabled={disabled}
    >
      <InputLabel id={`${id}-label`}>{error ?? label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={id}
        value={
          value
            ? `${value}`
            : showNothingSelected
              ? ""
              : Array.isArray(values)
                ? `${values[0]}`
                : `${Object.keys(values)[0]}`
        }
        label={error ?? label}
        onChange={handleChange}
      >
        {Array.isArray(values) &&
          values.map((val, idx) => (
            <MenuItem
              key={idx.toString() + val.toString()}
              value={`${val}`}
            >
              {hasDistinctValues(values, [0, 1])
                ? `${val}` === "1"
                  ? texts.select.trueFalse.yes
                  : texts.select.trueFalse.no
                : valueToDisplay(val)}
            </MenuItem>
          ))}
        {!Array.isArray(values) &&
          Object.entries(values).map(([key, val], idx) => (
            <MenuItem
              key={idx.toString() + key + val.toString()}
              value={`${key}`}
            >
              {valueToDisplay(val)}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}
export default SelectMui
