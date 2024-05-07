"use client"

import React, { useState } from "react"
import texts from "@/texts"
import Button from "@mui/material/Button"
import {
  handleChangeData,
  handleInputDefaultErrors,
  handleInputErrors,
} from "@/utils"
import log from "@/utils/log"
import doAxios from "@/utils/doAxios"
import InputField from "@/components/_common/form/InputField"
import notificationStore from "@/stores/notificationStore"
import authStore from "@/stores/authStore"
import { useRouter } from "next/navigation"
import nav from "@/router"
import { extShowPasswordStateHandler } from "@/utils/inputField"

const PasswordChangePage = () => {
  const router = useRouter()
  const logout = authStore((state) => state.logout)

  const setNotification = notificationStore((state) => state.setNotification)

  const [password, setPassword] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputErrorsDefaultState = {
    current_password: undefined as string[] | undefined,
    password: undefined as string[] | undefined,
    password_confirmation: undefined as string[] | undefined,
  }
  const [inputErrors, setInputErrors] = useState(inputErrorsDefaultState)

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeData(e, setPassword)
    handleInputDefaultErrors(inputErrorsDefaultState, setInputErrors)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    setIsSubmitting(true)

    doAxios("/user/password", "put", false, password)
      .then((res) => {
        logout()
        nav("login", router)
      })
      .catch((err) => {
        handleInputErrors(err, setInputErrors)
        setNotification(err.response.data.message, "error")
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputField
          id="current_password"
          label={texts.user.changePassword.form.currentPassword}
          handleChange={handleChange}
          type="password"
          error={inputErrors.current_password}
        />
        <InputField
          id="password"
          label={texts.user.changePassword.form.newPassword}
          handleChange={handleChange}
          type="password"
          error={inputErrors.password}
          extShowPasswordStateHandler={(update) =>
            extShowPasswordStateHandler(update, showPassword, setShowPassword)
          }
        />
        <InputField
          id="password_confirmation"
          label={texts.user.changePassword.form.newPasswordRepeat}
          handleChange={handleChange}
          type="password"
          error={inputErrors.password_confirmation}
          extShowPasswordStateHandler={(update) =>
            extShowPasswordStateHandler(update, showPassword, setShowPassword)
          }
        />
        <Button
          disabled={isSubmitting}
          variant="contained"
          type="submit"
        >
          {texts.user.changePassword.form.saveBtn}
        </Button>
      </form>
    </div>
  )
}
export default PasswordChangePage
