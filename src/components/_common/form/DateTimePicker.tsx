import React from "react"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { Dayjs } from "dayjs"
import cltm from "@/utils/cltm"

const DateTimeChooser = ({
  handleChange,
  label,
  defaultValue,
  minDateTime,
  className,
  error,
}: {
  handleChange?: (event: Dayjs | null) => void
  label: string
  defaultValue?: Dayjs
  minDateTime?: Dayjs
  className?: string
  error?: string[]
}) => {
  return (
    <DateTimePicker
      onChange={(e) => (handleChange ? handleChange(e) : void 0)}
      className={cltm("w-full mb-2", className && `w-full mb-2 ${className}`)}
      defaultValue={defaultValue}
      minDateTime={minDateTime}
      slotProps={{
        textField: {
          error: error && error.length > 0,
          label: error && error.length > 0 ? error : label,
        },
      }}
    />
  )
}
export default DateTimeChooser
