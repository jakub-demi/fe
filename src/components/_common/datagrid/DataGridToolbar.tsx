import React from "react"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import { GridToolbarContainer } from "@mui/x-data-grid"
import texts from "@/texts"
import MaterialIcon from "@/components/_common/MaterialIcon"
import { useRouter } from "next/navigation"

const DataGridToolbar = ({
  color = "primary",
  icon = <AddIcon />,
  handleClick,
  btnText = texts.dataGrid.toolbar.button.create,
  backBtn = false,
}: {
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  icon?: React.ReactNode
  handleClick?: () => void
  btnText?: string
  backBtn?: boolean
}) => {
  const router = useRouter()
  const back = () => router.back()

  return (
    <GridToolbarContainer>
      {backBtn && (
        <Button
          color={color}
          startIcon={
            <MaterialIcon
              icon="arrow_back"
              className="text-xl"
            />
          }
          onClick={back}
        >
          {texts.dataGrid.toolbar.button.back}
        </Button>
      )}
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
