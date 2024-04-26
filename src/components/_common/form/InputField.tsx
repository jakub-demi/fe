import React from "react"
import TextField from "@mui/material/TextField"
import cltm from "@/utils/cltm"
import { TextFieldVariants } from "@mui/material/TextField/TextField"

const InputField = ({
  id,
  label,
  handleChange,
  defaultValue,
  className,
  type,
  variant = "outlined",
  error,
  min,
  max,
}: {
  id: string
  label: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string | number
  className?: string
  type?: React.InputHTMLAttributes<unknown>["type"]
  variant?: TextFieldVariants
  error?: string[]
  min?: number
  max?: number
}) => {
  return (
    <TextField
      id={id}
      defaultValue={defaultValue}
      className={cltm(
        "w-full mb-2.5",
        className && `w-full mb-2.5 ${className}`
      )}
      label={error && error.length > 0 ? error : label}
      variant={variant}
      type={type}
      onChange={handleChange}
      error={error && error.length > 0}
      inputProps={
        type === "number"
          ? {
              max: min,
              min: max,
            }
          : undefined
      }
    />
  )
}
export default InputField
