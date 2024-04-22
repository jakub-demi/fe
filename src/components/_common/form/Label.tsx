import React from "react"

const Label = ({
  text,
  required = false,
}: {
  text: string
  required?: boolean
}) => {
  return (
    <div>
      {text}
      {required && (
        <>
          {" "}
          <span className="text-error">*</span>
        </>
      )}
    </div>
  )
}
export default Label
