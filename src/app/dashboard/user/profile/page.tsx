"use client"

import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import MaterialIcon from "@/components/_common/MaterialIcon"
import Button from "@mui/material/Button"
import { UserT } from "@/types"
import authStore from "@/stores/authStore"
import texts from "@/texts"
import { produce } from "immer"
import log from "@/utils/log"
import doAxios from "@/utils/doAxios"
import notificationStore from "@/stores/notificationStore"
import { handleChangeData, handleInputErrors } from "@/utils"
import InputField from "@/components/_common/form/InputField"

const ProfilePage = () => {
  const user = authStore.getState().user
  const setUser = authStore((state) => state.setUser)

  const setNotification = notificationStore((state) => state.setNotification)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userData, setUserData] = useState<UserT | null>(user)
  const inputErrorsDefaultState = {
    email: undefined,
    firstname: undefined,
    lastname: undefined,
  }
  const [inputErrors, setInputErrors] = useState(inputErrorsDefaultState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeData(event, setUserData)
    setInputErrors(
      produce((draft) => {
        return inputErrorsDefaultState
      })
    )
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    log("handleSubmit - userData", userData)

    if (userData) {
      setIsSubmitting(true)

      doAxios("/user/update-profile", "post", true, userData)
        .then((res) => {
          setUser(userData)

          log("res.data", res.data)

          setNotification(res.data.message)
        })
        .catch((err) => {
          log("err", err)

          // setInputErrors(
          //   produce(
          //     (draft) => {
          //       return err.response.data.errors
          //     }
          //   )
          // )

          handleInputErrors(err, setInputErrors)

          log("errors (res)", err.response.data)
          log("errors (state)", inputErrors)
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

        {/*<TextField*/}
        {/*  defaultValue={user?.email}*/}
        {/*  className="w-full mb-2.5"*/}
        {/*  id="email"*/}
        {/*  label={inputErrors.email ?? texts.user.profile.form.email}*/}
        {/*  variant="outlined"*/}
        {/*  onChange={handleChange}*/}
        {/*  error={inputErrors.email !== undefined}*/}
        {/*/>*/}
        {/*<TextField*/}
        {/*  defaultValue={user?.firstname}*/}
        {/*  className="w-full mb-2.5"*/}
        {/*  id="firstname"*/}
        {/*  label={inputErrors.firstname ?? texts.user.profile.form.firstname}*/}
        {/*  variant="outlined"*/}
        {/*  onChange={handleChange}*/}
        {/*  error={inputErrors.firstname !== undefined}*/}
        {/*/>*/}
        {/*<TextField*/}
        {/*  defaultValue={user?.lastname}*/}
        {/*  className="w-full mb-2.5"*/}
        {/*  id="lastname"*/}
        {/*  label={inputErrors.lastname ?? texts.user.profile.form.lastname}*/}
        {/*  variant="outlined"*/}
        {/*  onChange={handleChange}*/}
        {/*  error={inputErrors.lastname !== undefined}*/}
        {/*/>*/}

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
