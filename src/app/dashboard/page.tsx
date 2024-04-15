"use client"

import React from "react"
import authStore from "@/stores/authStore"
import doAxios from "@/utils/doAxios"
import nav from "@/router"
import { useRouter } from "next/navigation"
import { Grid, Paper, styled } from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Deposits from "@/components/dashboard/Deposits"
import Orders from "@/components/dashboard/Orders"

const DashboardPage = () => {
  const logout = authStore((state) => state.logout)
  const router = useRouter()

  const handleLogout = () => {
    doAxios("/logout", "post").then(() => {
      logout()
      nav("login", router)
    })
  }

  const drawerWidth: number = 240

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }))

  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Grid
      container
      spacing={3}
    >
      {/* Recent Deposits */}
      <Grid
        item
        xs={12}
        md={4}
        lg={3}
      >
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Deposits />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid
        item
        xs={12}
      >
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  )
}
export default DashboardPage
