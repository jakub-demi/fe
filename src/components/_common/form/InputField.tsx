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
  variant,
  error,
}: {
  id: string
  label: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string
  className?: string
  type?: React.InputHTMLAttributes<unknown>["type"]
  variant?: TextFieldVariants
  error?: string[]
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
      variant={variant ?? "outlined"}
      type={type}
      onChange={handleChange}
      error={error && error.length > 0}
    />
  )
}
export default InputField
