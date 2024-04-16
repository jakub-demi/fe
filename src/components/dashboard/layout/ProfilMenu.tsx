import React from "react"
import MaterialIcon from "@/components/_common/MaterialIcon"
import { Menu, MenuItem } from "@mui/material"
import Divider from "@mui/material/Divider"
import { useRouter } from "next/navigation"
import doAxios from "@/utils/doAxios"
import authStore from "@/stores/authStore"
import nav from "@/router"

const ProfilMenu = () => {
  const router = useRouter()
  const logout = authStore((state) => state.logout)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNav = (route?: string) => {
    setAnchorEl(null)
    route && nav(route, router)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    doAxios("/logout", "post").then(() => {
      logout()
      nav("login", router)
    })
  }

  return (
    <div>
      <div
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MaterialIcon icon="account_circle" />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleNav()}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleNav("profile")}>Profile</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
export default ProfilMenu
