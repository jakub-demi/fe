import React from "react"
import ListItemButton from "@mui/material/ListItemButton"
import nav, { getRouteTitleByName } from "@/router"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useRouter } from "next/navigation"
import MaterialIcon from "@/components/_common/MaterialIcon"

const MenuListItem = ({
  route,
  title,
  icon,
}: {
  route?: string
  title?: string
  icon?: React.ReactElement
}) => {
  const router = useRouter()

  return (
    <ListItemButton onClick={() => (route ? nav(route, router) : {})}>
      <ListItemIcon>
        {!icon ? <MaterialIcon icon="list" /> : <>{icon}</>}
      </ListItemIcon>
      <ListItemText
        primary={title ?? (route ? getRouteTitleByName(route) : "List Item")}
      />
    </ListItemButton>
  )
}
export default MenuListItem
