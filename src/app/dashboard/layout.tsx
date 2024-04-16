"use client"

import React, { useEffect, useState } from "react"
import AuthMiddleware from "@/components/_common/AuthMiddleware"
import {
  Box,
  Container,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import {
  MainMenuListItems,
  SecondaryMenuListItems,
} from "@/components/dashboard/layout/MenuListItems"
import Drawer from "@/components/dashboard/layout/Drawer"
import Copyright from "@/components/dashboard/layout/Copyright"
import AppBar from "@/components/dashboard/layout/AppBar"
import { usePathname, useRouter } from "next/navigation"
import { getRouteTitle } from "@/router"
import log from "@/utils/log"
import ProfilMenu from "@/components/dashboard/layout/ProfilMenu"
import theme from "@/styles/theme"

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const pathname = usePathname()
  const router = useRouter()

  const dashboard = "Dashboard"
  const [pageTitle, setPageTitle] = useState<string | null>(dashboard)

  const [open, setOpen] = React.useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  useEffect(() => {
    setPageTitle(getRouteTitle(pathname) ?? dashboard)
  }, [pathname])

  return (
    <ThemeProvider theme={theme}>
      <AuthMiddleware>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="absolute"
            open={open}
          >
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {pageTitle}
              </Typography>
              <IconButton color="inherit">
                <ProfilMenu />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            open={open}
          >
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <MainMenuListItems router={router} />
              <Divider sx={{ my: 1 }} />
              <SecondaryMenuListItems router={router} />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container
              maxWidth="lg"
              sx={{ mt: 4, mb: 4 }}
            >
              {children}
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </AuthMiddleware>
    </ThemeProvider>
  )
}
export default DashboardLayout
