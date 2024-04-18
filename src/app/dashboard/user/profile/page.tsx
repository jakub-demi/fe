"use client"

import React, { useState } from "react"
import MaterialIcon from "@/components/_common/MaterialIcon"
import Button from "@mui/material/Button"
import { UserT } from "@/types"
import authStore from "@/stores/authStore"
import texts from "@/texts"
import log from "@/utils/log"
import doAxios from "@/utils/doAxios"
import notificationStore from "@/stores/notificationStore"
import {
  handleChangeData,
  handleInputDefaultErrors,
  handleInputErrors,
} from "@/utils"
import InputField from "@/components/_common/form/InputField"

const ProfilePage = () => {
  const user = authStore.getState().user
  const setUser = authStore((state) => state.setUser)

  const setNotification = notificationStore((state) => state.setNotification)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userData, setUserData] = useState<UserT | null>(user)
  const inputErrorsDefaultState = {
    email: undefined as string[] | undefined,
    firstname: undefined as string[] | undefined,
    lastname: undefined as string[] | undefined,
  }
  const [inputErrors, setInputErrors] = useState(inputErrorsDefaultState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeData(event, setUserData)
    handleInputDefaultErrors(inputErrorsDefaultState, setInputErrors)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (userData) {
      setIsSubmitting(true)

      doAxios("/user/update-profile", "post", true, userData)
        .then((res) => {
          setUser(userData)
          setNotification(res.data.message)
        })
        .catch((err) => {
          handleInputErrors(err, setInputErrors)
          setNotification(err.response.data.message, "error")
        })
        .finally(() => setIsSubmitting(false))
    }
  }

  return (
    <div>
      <div>
        <MaterialIcon
          icon="account_circle"
          className="text-9xl"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          id="email"
          defaultValue={user?.email}
          label={texts.user.profile.form.email}
          handleChange={handleChange}
          error={inputErrors.email}
        />
        <InputField
          id="firstname"
          defaultValue={user?.firstname}
          label={texts.user.profile.form.firstname}
          handleChange={handleChange}
          error={inputErrors.firstname}
        />
        <InputField
          id="lastname"
          defaultValue={user?.lastname}
          label={texts.user.profile.form.lastname}
          handleChange={handleChange}
          error={inputErrors.lastname}
        />
        <Button
          disabled={isSubmitting}
          variant="contained"
          type="submit"
        >
          {texts.user.profile.form.saveBtn}
        </Button>
      </form>
    </div>
  )
}
export default ProfilePage
