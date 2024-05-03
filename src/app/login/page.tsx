"use client"

import React, { useEffect, useState } from "react"
import doAxios from "@/utils/doAxios"
import { ChangePasswordT, CredentialsT } from "@/types"
import { produce } from "immer"
import authStore from "@/stores/authStore"
import { httpStatusE } from "@/types/enums"
import { useRouter, useSearchParams } from "next/navigation"
import nav from "@/router"
import log from "@/utils/log"
import cltm from "@/utils/cltm"
import ResetPassword from "@/components/login/ResetPassword"
import Button from "@/components/_common/Button"
import texts from "@/texts"
import ChangePassword from "@/components/login/ChangePassword"

const LoginPage = () => {
  const auth = authStore()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [credentials, setCredentials] = useState<CredentialsT>({
    email: "",
    password: "",
  })

  const [loginError, setLoginError] = useState<string | null>(null)

  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false)

  const [submitting, setSubmitting] = useState(false)

  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState(false)

  const [changePasswordData, setChangePasswordData] =
    useState<ChangePasswordT | null>(null)

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

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)

    if (credentials.email === "" && credentials.password === "") {
      setLoginError("Credentials are not filled.")
      return
    }

    doAxios("/sanctum/csrf-cookie").then(() => {
      doAxios("/login", "post", false, credentials)
        .then((res) => {
          if (
            res.status === httpStatusE.OK ||
            res.status === httpStatusE.FOUND
          ) {
            auth.login()
            nav("dashboard", router)
          }
        })
        .catch((err) => {
          setLoginError(err.response?.data?.message)
        })
        .finally(() => setSubmitting(false))
    })
  }

  useEffect(() => {
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    if (!searchParams.has("pwdres") || !token || !email) return

    setChangePasswordData({
      token: token,
      email: email,
    })

    setShowChangePasswordDialog(true)
  }, [])

  return (
    <>
      <ResetPassword
        open={showResetPasswordDialog}
        handleClose={() => setShowResetPasswordDialog(false)}
      />
      {changePasswordData && (
        <ChangePassword
          open={showChangePasswordDialog}
          changePasswordData={changePasswordData}
          handleClose={() => setShowChangePasswordDialog(false)}
        />
      )}

      <div className="bg-gray-50 text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
            <h2 className="text-center text-3xl font-extrabold">
              {texts.login.title}
            </h2>
            <form
              onSubmit={handleLogin}
              className="mt-10 space-y-4"
            >
              <div>
                <input
                  autoFocus
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={cltm(
                    "w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-primary",
                    loginError && "border-error focus:border-error"
                  )}
                  placeholder={texts.login.inputs.email}
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
                    loginError && "border-error focus:border-error"
                  )}
                  placeholder={texts.login.inputs.password}
                  onChange={(e) => updateCredentials("password", e)}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span
                    className="text-sm text-primary hover:text-primary-hover cursor-pointer"
                    onClick={() =>
                      setShowResetPasswordDialog(!showResetPasswordDialog)
                    }
                  >
                    {texts.login.buttons.forgotPassword}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  {loginError && (
                    <span className="text-error text-xs">{loginError}</span>
                  )}
                </div>
              </div>
              <div className="!mt-10">
                <Button
                  type="submit"
                  disabled={submitting}
                  text={texts.login.buttons.logIn}
                  className="w-full py-2.5 px-4 text-sm rounded focus:outline-none"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default LoginPage
