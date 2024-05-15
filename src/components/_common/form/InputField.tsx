import React, { useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import cltm from "@/utils/cltm"
import { TextFieldVariants } from "@mui/material/TextField/TextField"
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

const InputField = ({
  id,
  label,
  handleChange = () => void 0,
  defaultValue,
  className,
  type,
  variant = "outlined",
  error,
  min = 0,
  max = 99999,
  disabled = false,
  extShowPasswordStateHandler,
  acceptMimes,
}: {
  id: string
  label: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string | number
  className?: string
  type?: React.InputHTMLAttributes<unknown>["type"]
  variant?: TextFieldVariants
  error?: string[]
  min?: number
  max?: number
  disabled?: boolean
  extShowPasswordStateHandler?: (update: boolean) => boolean
  acceptMimes?: string[]
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordView = () => {
    extShowPasswordStateHandler
      ? extShowPasswordStateHandler(true)
      : setShowPassword(!showPassword)
  }

  const doShowPassword = (): boolean => {
    return extShowPasswordStateHandler
      ? extShowPasswordStateHandler(false)
      : showPassword
  }

  const doShrink = (): boolean | undefined => {
    return defaultValue || type === "file" ? true : undefined
  }

  const inputProps = () => {
    switch (type) {
      case "number":
        return {
          min: min,
          max: max,
        }
      case "file":
        return {
          accept: acceptMimes,
        }
      default:
        return undefined
    }
  }

  return (
    <>
      {(type as string) !== "password" ? (
        <TextField
          disabled={disabled}
          id={id}
          name={id}
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
          inputProps={inputProps()}
          InputLabelProps={{
            shrink: doShrink(),
          }}
        />
      ) : (
        <FormControl
          className={cltm(
            "w-full mb-2.5",
            className && `w-full mb-2.5 ${className}`
          )}
          variant="outlined"
          error={error && error.length > 0}
          disabled={disabled}
        >
          <InputLabel
            shrink={doShrink()}
            htmlFor={id}
          >
            {error && error.length > 0 ? error : label}
          </InputLabel>
          <OutlinedInput
            id={id}
            name={id}
            type={doShowPassword() ? "text" : "password"}
            onChange={handleChange}
            defaultValue={defaultValue}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle Password Visibility"
                  onClick={handlePasswordView}
                  onMouseDown={handlePasswordView}
                  edge="end"
                >
                  {doShowPassword() ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={error && error.length > 0 ? error : label}
          />
        </FormControl>
      )}
    </>
  )
}
export default InputField
