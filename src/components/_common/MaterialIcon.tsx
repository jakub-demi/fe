import React from "react"
import cltm from "@/utils/cltm"

const MaterialIcon = ({
  icon,
  className,
}: {
  icon: string
  className?: string
}) => {
  return (
    <span
      className={cltm(
        "material-icons text-[24px]",
        className !== undefined && `material-icons text-[24px] ${className}`
      )}
    >
      {icon}
    </span>
  )
}
export default MaterialIcon
