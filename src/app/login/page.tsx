"use client"

import React, { useEffect, useRef, useState } from "react"
import doAxios from "@/utils/doAxios"
import { CredentialsType } from "@/types"
import { produce } from "immer"
import authStore from "@/stores/authStore"

const LoginPage = () => {
  const [credentials, setCredentials] = useState<CredentialsType>({
    email: "",
    password: "",
  })

  const email = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setCredentials(
      produce((draft) => {
        draft.email = email.current?.value ?? ""
        draft.password = password.current?.value ?? ""
      })
    )
  }, [email, password])

  const retrieveUserData = () => {
    doAxios("/user", "get", true)
  }

  const handleLogin = () => {
    doAxios("/login", "post", false, credentials)
      .then((response) => {
        const user = response.data.data
        authStore.getState().login(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //todo:dev remove
  useEffect(() => {
    console.log(
      "process.env.NEXT_PUBLIC_API_BASE_URL:",
      process.env.NEXT_PUBLIC_API_BASE_URL
    )

    doAxios("/test", "get", true).then((r) => {
      console.log(r.data)
    })

    doAxios("/login", "post", false)
  }, [])

  return (
    <div className="bg-gray-50 text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <h2 className="text-center text-3xl font-extrabold">Login</h2>
          <form className="mt-10 space-y-4">
            <div>
              <input
                ref={email}
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-primary"
                placeholder="Email Address"
              />
            </div>
            <div>
              <input
                ref={password}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-primary"
                placeholder="Password"
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
            <div className="!mt-10">
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full py-2.5 px-4 text-sm rounded text-white bg-primary hover:bg-primary-hover focus:outline-none"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
