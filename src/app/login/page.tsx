"use client"

import React, { useEffect, useState } from "react"
import doAxios from "@/utils/doAxios"
import { CredentialsT } from "@/types"
import { produce } from "immer"
import authStore from "@/stores/authStore"
import { httpStatusE } from "@/types/enums"
import { useRouter } from "next/navigation"
import nav from "@/router"
import log from "@/utils/log"
import cltm from "@/utils/cltm"

const LoginPage = () => {
  const auth = authStore()
  const router = useRouter()

  const [credentials, setCredentials] = useState<CredentialsT>({
    email: "",
    password: "",
  })

  const [loginError, setLoginError] = useState<string | null>(null)

  const updateCredentials = (
    type: keyof CredentialsT,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginError(null)
    setCredentials(
      produce((draft) => {
        draft[type] = e.target.value
      })
    )
  }

  const handleLogin = () => {
    if (credentials.email === "" && credentials.password === "") {
      setLoginError("Credentials are not filled.")
      return
    }

    log("credentials", credentials)

    doAxios("/login", "post", false, credentials)
      .then((res) => {
        if (res.status === httpStatusE.OK || res.status === httpStatusE.FOUND) {
          auth.login()
          nav("dashboard", router)
        }

        // const user = response.data.data
        // authStore.getState().login(user)
      })
      .catch((err) => {
        setLoginError(err.response?.data?.message)
      })
  }

  //todo:dev remove
  // useEffect(() => {
  //   // doAxios("/test", "get", true).then((r) => {
  //   //   console.log(r.data)
  //   // })
  // }, [])

  return (
    <div className="bg-gray-50 text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <h2 className="text-center text-3xl font-extrabold">Login</h2>
          <div className="mt-10 space-y-4">
            <div>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className={cltm(
                  "w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-primary",
                  loginError && "border-red-600"
                )}
                placeholder="Email Address"
                onChange={(e) => updateCredentials("email", e)}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={cltm(
                  "w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-primary",
                  loginError && "border-red-600"
                )}
                placeholder="Password"
                onChange={(e) => updateCredentials("password", e)}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <a
                  href=""
                  className="text-sm text-primary hover:text-primary-hover"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                {loginError && (
                  <span className="text-red-600 text-xs">{loginError}</span>
                )}
              </div>
            </div>
            <div className="!mt-10">
              <button
                //disabled={credentials.email === "" && credentials.password === ""}
                onClick={handleLogin}
                className="w-full py-2.5 px-4 text-sm rounded text-white bg-primary hover:bg-primary-hover focus:outline-none disabled:bg-gray-300"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
