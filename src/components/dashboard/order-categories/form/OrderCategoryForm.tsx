"use client"

import React, { useEffect, useState } from "react"
import { Box, Container } from "@mui/material"
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
import { FormErrorT, OrderCategoryDataCreateUpdateT } from "@/types"

const OrderCategoryForm = ({
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

  const [resData, setResData] = useState<OrderCategoryDataCreateUpdateT>({
    name: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputErrorsDefaultState = {
    name: undefined as FormErrorT,
  }
  const [inputErrors, setInputErrors] = useState(inputErrorsDefaultState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeData(event, setResData)
    handleInputDefaultErrors(inputErrorsDefaultState, setInputErrors)
  }

  const createOrUpdateUser = () => {
    setIsSubmitting(true)

    doAxios(
      !isUpdateForm ? "/order-categories" : `/order-categories/${id}`,
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

    doAxios(`/order-categories/${id}`, "get", true).then((res) => {
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
            id="name"
            label={texts.orderCategories.form.common.name.label}
            defaultValue={resData?.name}
            handleChange={(e) => handleChange(e)}
            error={inputErrors.name}
          />

          <Button
            handleClick={() => nav("order-categories", router)}
            text={texts.orderCategories.form.view.button}
          />
          {!readonly && (
            <Button
              className="ml-1"
              disabled={isSubmitting}
              handleClick={createOrUpdateUser}
              text={
                isUpdateForm
                  ? texts.orderCategories.form.update.button
                  : texts.orderCategories.form.create.button
              }
            />
          )}
        </Box>
      </Container>
    )
}
export default OrderCategoryForm
