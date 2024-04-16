"use client"

import * as React from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PeopleIcon from "@mui/icons-material/People"
import AssignmentIcon from "@mui/icons-material/Assignment"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import nav, { getRouteTitleByName } from "@/router"

export const MainMenuListItems = ({
  router,
}: {
  router: AppRouterInstance
}): React.JSX.Element => (
  <>
    <ListItemButton onClick={() => nav("dashboard", router)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary={getRouteTitleByName("dashboard")} />
    </ListItemButton>

    <ListItemButton onClick={() => nav("orders", router)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary={getRouteTitleByName("orders")} />
    </ListItemButton>

    <ListItemButton onClick={() => nav("users", router)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary={getRouteTitleByName("users")} />
    </ListItemButton>
  </>
)

export const SecondaryMenuListItems = ({
  router,
}: {
  router: AppRouterInstance
}): React.JSX.Element => (
  <>
    <ListSubheader
      component="div"
      inset
    >
      Administrator
    </ListSubheader>

    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
  </>
)
