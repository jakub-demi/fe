import React from "react"
import Button from "@mui/material/Button"
import cltm from "@/utils/cltm"
import SpinLoader from "@/components/_common/SpinLoader"

const Btn = ({
  handleClick,
  text,
  className,
  disabled = false,
  type = "button",
}: {
  handleClick?: () => void
  text: string
  className?: string
  disabled?: boolean
  type?: "button" | "submit"
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={cltm(
        `text-white bg-primary hover:bg-primary-hover py-2 px-2 ${className}`
      )}
    >
      {!disabled ? <>{text}</> : <SpinLoader />}
    </Button>
  )
}
export default Btn
