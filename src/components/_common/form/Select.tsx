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
}: {
  id: string
  value?: string | number
  label: string
  values: string[] | number[]
  handleChange: (event: SelectChangeEvent) => void
  error?: string[]
  specificValueDisplayFormat?: string
  className?: string
  disabled?: boolean
}) => {
  const valueToDisplay = (value: string | number) => {
    return specificValueDisplayFormat
      ? specificValueDisplayFormat.replace("%v", `${value}`)
      : value
  }

  return (
    <FormControl
      className={cltm("w-full mb-2", className && `w-full mb-2 ${className}`)}
    >
      <InputLabel id={`${id}-label`}>{error ?? label}</InputLabel>
      <Select
        disabled={disabled}
        labelId={`${id}-label`}
        id={id}
        value={value ? `${value}` : `${values[0]}`}
        defaultValue={`${value}`}
        label={error ?? label}
        onChange={handleChange}
      >
        {values.map((val, idx) => (
          <MenuItem
            key={idx.toString() + val.toString()}
            value={`${val}`}
          >
            {valueToDisplay(val)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default SelectMui
