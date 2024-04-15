"use client"

import React from "react"
import AuthMiddleware from "@/components/_common/AuthMiddleware"
import {
  Badge,
  Box,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsIcon from "@mui/icons-material/Notifications"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import {
  mainListItems,
  secondaryListItems,
} from "@/components/dashboard/ListItems"
import Drawer from "@/components/dashboard/Drawer"
import Copyright from "@/components/dashboard/Copyright"
import AppBar from "@/components/dashboard/AppBar"

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const drawerWidth = 240

  return (
    <html lang="en">
      <body>
        <AuthMiddleware>
          <ThemeProvider theme={createTheme()}>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <AppBar
                position="absolute"
                open={open}
                drawerWidth={drawerWidth}
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
                    Dashboard
                  </Typography>
                  <IconButton color="inherit">
                    <Badge
                      badgeContent={4}
                      color="secondary"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                open={open}
                drawerWidth={drawerWidth}
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
                  {mainListItems}
                  <Divider sx={{ my: 1 }} />
                  {secondaryListItems}
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
          </ThemeProvider>
        </AuthMiddleware>
      </body>
    </html>
  )
}
export default DashboardLayout
