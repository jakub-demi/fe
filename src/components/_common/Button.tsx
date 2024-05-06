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
  icon,
  tabIndex,
}: {
  handleClick?: () => void
  text: string
  className?: string
  disabled?: boolean
  type?: "button" | "submit"
  icon?: React.JSX.Element
  tabIndex?: number
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={cltm(
        `text-white bg-primary hover:bg-primary-hover py-2 px-2 ${className}`
      )}
      startIcon={icon}
      tabIndex={tabIndex}
    >
      {!disabled ? <>{text}</> : <SpinLoader />}
    </Button>
  )
}
export default Btn
