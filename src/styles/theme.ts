import { createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    primary: {
      light: "#5082ef",
      main: "#2563eb",
      dark: "#1d4ed8", // "#1945a4"
    },
    secondary: {
      light: "#f0c35f",
      main: "#edb437",
      dark: "#ebad25", // "#a57d26"
    },
    error: {
      light: "#e35151",
      main: "#dc2626",
      dark: "#9a1a1a",
    },
  },
})
export default theme
