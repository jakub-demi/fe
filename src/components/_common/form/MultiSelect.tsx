import React, { useEffect, useState } from "react"
import MenuItem from "@mui/material/MenuItem"
import Checkbox from "@mui/material/Checkbox"
import ListItemText from "@mui/material/ListItemText"
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import cltm from "@/utils/cltm"
import { MultiSelectValuesT } from "@/types"

const MultiSelect = ({
  id,
  selectedValues,
  label,
  valuesToChooseFrom,
  handleChange,
  error,
  specificValueDisplayFormat,
  className,
  disabled = false,
  lockedKeys,
}: {
  id: string
  selectedValues: string[] | number[]
  label: string
  valuesToChooseFrom: MultiSelectValuesT
  handleChange: (event: SelectChangeEvent<string[]>) => void
  error?: string[]
  specificValueDisplayFormat?: string
  className?: string
  disabled?: boolean
  lockedKeys?: string[]
}) => {
  const [selectedVals, setSelectedVals] = useState<string[]>([])

  const valueToDisplay = (value: string) => {
    return specificValueDisplayFormat
      ? specificValueDisplayFormat.replace("%v", `${value}`)
      : value
  }

  useEffect(() => {
    setSelectedVals(selectedValues.map(String))
  }, [selectedValues])

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
        value={selectedVals}
        label={error ?? label}
        onChange={handleChange}
        multiple
        input={<OutlinedInput label={error ?? label} />}
        renderValue={(selected) =>
          selectedVals.map((key) => valuesToChooseFrom[key]).join(", ")
        }
        error={error && error.length > 0}
      >
        {Object.entries(valuesToChooseFrom).map(([key, val], idx) => (
          <MenuItem
            key={idx.toString() + key + val}
            value={key}
            disabled={lockedKeys?.includes(key)}
          >
            <Checkbox checked={selectedVals.indexOf(key) > -1} />
            <ListItemText primary={valueToDisplay(val)} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default MultiSelect
