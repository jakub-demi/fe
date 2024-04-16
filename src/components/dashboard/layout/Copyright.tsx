import { Typography } from "@mui/material"
import React from "react"

const Copyright = (props: any): React.ReactElement => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
export default Copyright
