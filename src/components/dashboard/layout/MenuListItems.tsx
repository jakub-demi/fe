"use client"

import * as React from "react"
import ListSubheader from "@mui/material/ListSubheader"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import CategoryIcon from "@mui/icons-material/Category"
import PeopleIcon from "@mui/icons-material/People"
import AssignmentIcon from "@mui/icons-material/Assignment"
import MenuListItem from "@/components/dashboard/layout/MenuListItem"
import texts from "@/texts"

export const MainMenuListItems = (): React.JSX.Element => (
  <>
    <MenuListItem
      route="dashboard"
      icon={<DashboardIcon />}
    />
    <MenuListItem
      route="orders"
      icon={<ShoppingCartIcon />}
    />
    <MenuListItem
      route="order-categories"
      icon={<CategoryIcon />}
    />
    <MenuListItem
      route="users"
      icon={<PeopleIcon />}
    />
  </>
)

export const AdminMenuListItems = (): React.JSX.Element => (
  <>
    <ListSubheader
      component="div"
      inset
    >
      {texts.drawerMenu.secondSection.title}
    </ListSubheader>

    <MenuListItem
      icon={<AssignmentIcon />}
      title="Temp Item"
    />
  </>
)
