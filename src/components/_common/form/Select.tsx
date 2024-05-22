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
import Tooltip from "@mui/material/Tooltip"

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
  noValueShowNothingSelected = false,
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
  noValueShowNothingSelected?: boolean
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
      <InputLabel
        id={`${id}-label`}
        error={error && error.length > 0}
      >
        {error ?? label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={id}
        value={
          value
            ? `${value}`
            : noValueShowNothingSelected
              ? ""
              : Array.isArray(values)
                ? `${values[0]}`
                : `${Object.keys(values)[0]}`
        }
        label={error ?? label}
        onChange={handleChange}
        error={error && error.length > 0}
      >
        {noValueShowNothingSelected && (
          <Tooltip
            title={texts.select.nothingSelected.tooltip}
            arrow
          >
            <MenuItem>
              <i>{texts.select.nothingSelected.text}</i>
            </MenuItem>
          </Tooltip>
        )}
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
