"use client"

import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useRouter } from "next/navigation"
import nav from "@/router"
import doAxios from "@/utils/doAxios"
import notificationStore from "@/stores/notificationStore"
import texts from "@/texts"
import confirmDialogStore from "@/stores/confirmDialogStore"
import Divider from "@mui/material/Divider"

const ActionsMenu = ({
  datagridPage,
  id,
  handleReloadData,
  additionalActionItems,
}: {
  datagridPage: string
  id: number | number[]
  handleReloadData: () => void
  additionalActionItems?: React.ReactNode
}): React.JSX.Element => {
  const router = useRouter()
  const setNotification = notificationStore((state) => state.setNotification)

  const setConfirmDialog = confirmDialogStore((state) => state.setConfirmDialog)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAction = (type: "view" | "edit" | "delete") => {
    handleClose()

    type === "view" && nav(`${datagridPage}.view`, router, false, id)
    type === "edit" && nav(`${datagridPage}.edit`, router, false, id)
    type === "delete" &&
      setConfirmDialog(
        texts.actionsMenu.confirmDialog.titleItemRemoval,
        undefined,
        undefined,
        undefined,
        () => handleDelete()
      )
  }

  const handleDelete = () => {
    const _id = typeof id === "number" ? id : id[id.length - 1]
    doAxios(`/${datagridPage}/${_id}`, "delete", true)
      .then((res) => {
        setNotification(res.data.message)
        handleReloadData()
      })
      .catch((err) => {
        setNotification(err.response.data.message, "error")
      })
  }

  return (
    <div>
      <Button
        className="py-2 px-4 bg-primary hover:bg-primary-hover text-white"
        id="actions-menu"
        aria-controls={open ? "actions-menu-button" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {texts.actionsMenu.title}
      </Button>
      <Menu
        id="actions-menu"
        aria-labelledby="actions-menu-button"
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
        <MenuItem onClick={() => handleAction("view")}>
          {texts.actionsMenu.view}
        </MenuItem>
        <MenuItem onClick={() => handleAction("edit")}>
          {texts.actionsMenu.edit}
        </MenuItem>
        <MenuItem onClick={() => handleAction("delete")}>
          {texts.actionsMenu.delete}
        </MenuItem>
        {additionalActionItems && <Divider />}
        {additionalActionItems !== undefined && additionalActionItems}
      </Menu>
    </div>
  )
}

export default ActionsMenu
