import React from "react"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import { GridToolbarContainer } from "@mui/x-data-grid"
import texts from "@/texts"

const DataGridToolbar = ({
  color = "primary",
  icon = <AddIcon />,
  handleClick,
  btnText = texts.dataGrid.toolbar.button.create,
}: {
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  icon?: React.ReactNode
  handleClick?: () => void
  btnText?: string
}) => {
  return (
    <GridToolbarContainer>
      <Button
        color={color}
        startIcon={icon}
        onClick={handleClick}
      >
        {btnText}
      </Button>
    </GridToolbarContainer>
  )
}
export default DataGridToolbar
