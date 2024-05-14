"use client"

import React, { useEffect, useState } from "react"
import MaterialIcon from "@/components/_common/MaterialIcon"
import { Menu, MenuItem } from "@mui/material"
import Divider from "@mui/material/Divider"
import { useRouter } from "next/navigation"
import doAxios from "@/utils/doAxios"
import authStore from "@/stores/authStore"
import nav from "@/router"
import texts from "@/texts"
import Image from "next/image"
import cltm from "@/utils/cltm"
import Tooltip from "@mui/material/Tooltip"

const ProfilMenu = () => {
  const router = useRouter()
  const logout = authStore((state) => state.logout)
  const getUserAvatar = authStore((state) => state.getUserAvatar)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const [userAvatar, setUserAvatar] = useState(getUserAvatar)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNavAndClose = (route?: string) => {
    setAnchorEl(null)
    route && nav(route, router)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    doAxios("/logout", "post").finally(() => {
      logout()
      nav("login", router)
    })
  }

  useEffect(() => {
    setUserAvatar(getUserAvatar)
  }, [getUserAvatar])

  return (
    <div>
      <div
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        className={cltm(
          "leading-3 rounded-full",
          userAvatar && "border-2 border-primary-hover bg-white"
        )}
      >
        <Tooltip
          title={texts.topMenu.tooltip}
          arrow
        >
          {userAvatar ? (
            <Image
              src={userAvatar}
              alt="User Menu Image"
              width={30}
              height={30}
              className="rounded-full"
            />
          ) : (
            <MaterialIcon
              icon="account_circle"
              className="text-[30px]"
            />
          )}
        </Tooltip>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleNavAndClose()}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleNavAndClose("profile")}>
          {texts.topMenu.avatar.profile}
        </MenuItem>

        <MenuItem onClick={() => handleNavAndClose("changePassword")}>
          {texts.topMenu.avatar.changePassword}
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          {texts.topMenu.avatar.logout}
        </MenuItem>
      </Menu>
    </div>
  )
}
export default ProfilMenu
