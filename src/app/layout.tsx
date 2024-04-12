"use client"

// import type { Metadata } from "next"
import "@/styles/globals.css"
import React, { useEffect, useState } from "react"
import authStore from "@/stores/authStore"
import nav, { getRoute, getRouteTitle } from "@/router"
import { usePathname, useRouter } from "next/navigation"
import doAxios from "@/utils/doAxios"
import { httpStatusE } from "@/types/enums"
import Preloader from "@/components/_common/Preloader"
import log from "@/utils/log"

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const router = useRouter()
  const pathname = usePathname()
  const title = "Project"

  const loggedIn = authStore.getState().authed

  const setUser = authStore((state) => state.setUser)
  const login = authStore((state) => state.login)
  const logout = authStore((state) => state.logout)

  const [preloader, setPreloader] = useState(true)

  const check = () => {
    doAxios("/user", "get", true)
      .then((res) => {
        login()
        setUser(res.data.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === httpStatusE.UNAUTHORIZED) {
          logout()
          nav("login", router)
        }
      })

    !loggedIn && nav("login", router)

    if (
      (pathname === getRoute("login") || pathname === getRoute("home")) &&
      loggedIn
    ) {
      nav("dashboard", router)
    }

    document.title = getRouteTitle(pathname) ?? title

    setPreloader(false)
  }

  useEffect(() => {
    check()
  }, [pathname])

  return (
    <html lang="en">
      <body>{preloader ? <Preloader /> : <>{children}</>}</body>
    </html>
  )
}
export default RootLayout
