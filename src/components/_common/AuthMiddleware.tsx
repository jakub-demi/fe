"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import authStore from "@/stores/authStore"
import doAxios from "@/utils/doAxios"
import { httpStatusE } from "@/types/enums"
import nav, { doesRouteExist, getRoute, getRouteTitle } from "@/router"
import Preloader from "@/components/_common/Preloader"

const AuthMiddleware = ({
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

    if (!loggedIn && doesRouteExist(pathname)) {
      nav("login", router)
    }

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

  return <div>{preloader ? <Preloader /> : <>{children}</>}</div>
}
export default AuthMiddleware
