"use client"

import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import texts from "@/texts"
import Button from "@mui/material/Button"
import { handleChangeData, handleInputErrors } from "@/utils"
import log from "@/utils/log"
import doAxios from "@/utils/doAxios"
import InputField from "@/components/_common/form/InputField"
import { produce } from "immer"

const PasswordChangePage = () => {
  const [password, setPassword] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputErrorsDefaultState = {
    current_password: undefined as string | undefined,
    password: undefined as string | undefined,
    password_confirmation: undefined as string | undefined,
  }
  const [inputErrors, setInputErrors] = useState(inputErrorsDefaultState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeData(e, setPassword)
    setInputErrors(
      produce((draft) => {
        return inputErrorsDefaultState
      })
    )
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    setIsSubmitting(true)

    log("password (state)", password)
    //

    doAxios("/user/password", "put", false, password)
      .then((res) => {
        log("res", res)
      })
      .catch((err) => {
        log("err", err)
        handleInputErrors(err, setInputErrors)
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
          error={
            inputErrors.password && !inputErrors.password.includes("confirm")
              ? inputErrors.password
              : undefined
          }
        />
        <InputField
          id="password_confirmation"
          label={texts.user.changePassword.form.newPasswordRepeat}
          handleChange={handleChange}
          type="password"
          error={
            inputErrors.password && inputErrors.password.includes("confirm")
              ? inputErrors.password
              : undefined
          }
        />

        {/*<TextField
          id="current_password"
          className="w-full mb-2.5"
          label={inputErrors.current_password ?? texts.user.changePassword.form.currentPassword}
          variant="outlined"
          type="password"
          onChange={(e) => handleChangeData(e, setPassword)}
        />
        <TextField
          id="password"
          className="w-full mb-2.5"
          label={inputErrors.password ?? texts.user.changePassword.form.newPassword}
          variant="outlined"
          type="password"
          onChange={(e) => handleChangeData(e, setPassword)}
        />
        <TextField
          id="password_confirmation"
          className="w-full mb-2.5"
          label={inputErrors.password_confirmation ?? texts.user.changePassword.form.newPasswordRepeat}
          variant="outlined"
          type="password"
          onChange={(e) => handleChangeData(e, setPassword)}
          error={inputErrors.password_confirmation !== undefined}
        />*/}

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
