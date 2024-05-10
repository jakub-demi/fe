"use client"

import React, { useEffect, useState } from "react"
import { Box, Container, SelectChangeEvent } from "@mui/material"
import texts from "@/texts"
import Button from "@/components/_common/Button"
import notificationStore from "@/stores/notificationStore"
import doAxios from "@/utils/doAxios"
import log from "@/utils/log"
import {
  handleChangeData,
  handleInputDefaultErrors,
  handleInputErrors,
  handleResData,
} from "@/utils"
import Preloader from "@/components/_common/Preloader"
import nav from "@/router"
import { useRouter } from "next/navigation"
import InputField from "@/components/_common/form/InputField"
import { FormErrorT, UserDataCreateUpdateT } from "@/types"
import Select from "@/components/_common/form/Select"
import { produce } from "immer"
import { extShowPasswordStateHandler } from "@/utils/inputField"

const UserForm = ({
  id,
  readonly = false,
}: {
  id?: number
  readonly?: boolean
}) => {
  const isUpdateForm: boolean = id !== undefined

  const router = useRouter()

  const setNotification = notificationStore((state) => state.setNotification)

  const [loading, setLoading] = useState(true)

  const [resData, setResData] = useState<UserDataCreateUpdateT>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
    is_admin: 0,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputErrorsDefaultState = {
    firstname: undefined as FormErrorT,
    lastname: undefined as FormErrorT,
    email: undefined as FormErrorT,
    password: undefined as FormErrorT,
    password_confirmation: undefined as FormErrorT,
    is_admin: undefined as FormErrorT,
  }
  const [inputErrors, setInputErrors] = useState(inputErrorsDefaultState)

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeData(event, setResData)
    handleInputDefaultErrors(inputErrorsDefaultState, setInputErrors)
  }

  const handleIsAdminChange = (event: SelectChangeEvent) => {
    setResData(
      produce((draft) => {
        draft && (draft.is_admin = event.target.value === "1" ? 1 : 0)
      })
    )
  }

  const createOrUpdateUser = () => {
    setIsSubmitting(true)

    doAxios(
      !isUpdateForm ? "/users" : `/users/${id}`,
      !isUpdateForm ? "post" : "put",
      true,
      resData
    )
      .then((res) => {
        setNotification(res.data.message)
      })
      .catch((err) => {
        handleInputErrors(err, setInputErrors)
        setNotification(err.response.data.message, "error")
      })
      .finally(() => setIsSubmitting(false))
  }

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    doAxios(`/users/${id}`, "get", true).then((res) => {
      handleResData(res, setResData)
    })
  }, [])

  useEffect(() => {
    if (!resData) return

    setLoading(false)
  }, [resData])

  if (loading) {
    return <Preloader />
  } else
    return (
      <Container>
        <Box>
          <InputField
            disabled={readonly}
            id="firstname"
            label={texts.users.form.common.firstname.label}
            defaultValue={resData?.firstname}
            handleChange={(e) => handleChange(e)}
            error={inputErrors.firstname}
          />
          <InputField
            disabled={readonly}
            id="lastname"
            label={texts.users.form.common.lastname.label}
            defaultValue={resData?.lastname}
            handleChange={(e) => handleChange(e)}
            error={inputErrors.lastname}
          />
          <InputField
            disabled={readonly}
            id="email"
            label={texts.users.form.common.email.label}
            defaultValue={resData?.email}
            handleChange={(e) => handleChange(e)}
            error={inputErrors.email}
            type="email"
          />
          {!readonly && (
            <>
              <InputField
                id="password"
                label={texts.users.form.common.password.label}
                handleChange={(e) => handleChange(e)}
                error={inputErrors.password}
                type="password"
                extShowPasswordStateHandler={(update) =>
                  extShowPasswordStateHandler(
                    update,
                    showPassword,
                    setShowPassword
                  )
                }
              />
              <InputField
                id="password_confirmation"
                label={texts.users.form.common.password_confirmation.label}
                handleChange={(e) => handleChange(e)}
                error={inputErrors.password_confirmation}
                type="password"
                extShowPasswordStateHandler={(update) =>
                  extShowPasswordStateHandler(
                    update,
                    showPassword,
                    setShowPassword
                  )
                }
              />
            </>
          )}
          <Select
            disabled={readonly}
            id="is_admin"
            value={+resData?.is_admin}
            label={texts.users.form.common.is_admin.label}
            values={[0, 1]}
            handleChange={(e) => handleIsAdminChange(e)}
            error={inputErrors.is_admin}
          />

          <Button
            handleClick={() => nav("users", router)}
            text={texts.orders.form.view.button}
          />
          {!readonly && (
            <Button
              className="ml-1"
              disabled={isSubmitting}
              handleClick={createOrUpdateUser}
              text={
                isUpdateForm
                  ? texts.users.form.update.button
                  : texts.users.form.create.button
              }
            />
          )}
        </Box>
      </Container>
    )
}
export default UserForm
