import React from "react"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import { GridToolbarContainer } from "@mui/x-data-grid"
import texts from "@/texts"
import MaterialIcon from "@/components/_common/MaterialIcon"
import { useRouter } from "next/navigation"
import nav, { RouterParam } from "@/router"

const DataGridToolbar = ({
  color = "primary",
  icon = <AddIcon />,
  handleClick,
  btnText = texts.dataGrid.toolbar.button.create,
  backBtnRoute,
  backBtnRouteParams,
}: {
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  icon?: React.ReactNode
  handleClick?: () => void
  btnText?: string
  backBtnRoute?: string
  backBtnRouteParams?: RouterParam
}) => {
  const router = useRouter()
  const backClick = () => {
    backBtnRoute && nav(backBtnRoute, router, true, backBtnRouteParams)
  }

  return (
    <GridToolbarContainer>
      {backBtnRoute && (
        <Button
          color={color}
          startIcon={
            <MaterialIcon
              icon="arrow_back"
              className="text-xl"
            />
          }
          onClick={backClick}
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
