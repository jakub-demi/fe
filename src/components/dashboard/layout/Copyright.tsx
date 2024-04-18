import { Typography } from "@mui/material"
import React from "react"
import texts from "@/texts"

const Copyright = (props: any): React.ReactElement => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {texts.footer.copyright} {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
export default Copyright
