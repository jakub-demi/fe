"use client"

import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid"
import { useRouter } from "next/navigation"
import nav from "@/router"

const ActionsMenu = ({
  id,
  setter,
}: {
  id: number
  setter: React.Dispatch<React.SetStateAction<any>>
}): React.JSX.Element => {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpen = (type: "create" | "edit" | "delete") => {
    handleClose()

    type === "create" && nav("order.create", router)
    type === "edit" && nav("order.edit", router, false, id)
  }

  return (
    <div>
      <Button
        className="py-2 px-4 bg-primary hover:bg-primary-hover text-white rounded-md"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Action
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Create</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  )
}

export default ActionsMenu
