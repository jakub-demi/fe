import React from "react"
import Button from "@mui/material/Button"
import cltm from "@/utils/cltm"
import SpinLoader from "@/components/_common/SpinLoader"

const Btn = ({
  handleClick,
  text,
  className,
  disabled = false,
}: {
  handleClick: () => void
  text: string
  className?: string
  disabled?: boolean
}) => {
  return (
    <Button
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
