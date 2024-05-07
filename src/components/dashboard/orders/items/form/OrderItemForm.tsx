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
  handleForbiddenAccess,
  handleInputDefaultErrors,
  handleInputErrors,
  handleResData,
} from "@/utils"
import Preloader from "@/components/_common/Preloader"
import nav from "@/router"
import { useRouter } from "next/navigation"
import InputField from "@/components/_common/form/InputField"
import { OrderItemDataCreateUpdateT } from "@/types"
import Select from "@/components/_common/form/Select"
import { produce } from "immer"
import { getAndSetVatRates } from "@/utils/axiosCalls"
import { httpStatusE } from "@/types/enums"

const OrderItemForm = ({
  id,
  orderId,
  readonly = false,
}: {
  id?: number
  orderId: number
  readonly?: boolean
}) => {
  const isUpdateForm: boolean = id !== undefined

  const router = useRouter()

  const setNotification = notificationStore((state) => state.setNotification)

  const [loading, setLoading] = useState(true)

  const [resData, setResData] = useState<OrderItemDataCreateUpdateT>({
    name: "",
    count: undefined,
    cost: undefined,
    vat: 20,
  })

  const [vatRates, setVatRates] = useState<number[]>([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputErrorsDefaultState = {
    name: undefined as string[] | undefined,
    count: undefined as string[] | undefined,
    cost: undefined as string[] | undefined,
    vat: undefined as string[] | undefined,
  }
  const [inputErrors, setInputErrors] = useState(inputErrorsDefaultState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeData(event, setResData)
    handleInputDefaultErrors(inputErrorsDefaultState, setInputErrors)
  }

  const handleVatChange = (event: SelectChangeEvent) => {
    setResData(
      produce((draft) => {
        draft && (draft.vat = Number.parseFloat(event.target.value))
      })
    )
  }

  const getCreateUpdateData = () => {
    const vatCalc = resData.vat / 100
    return { ...resData, vat: vatCalc }
  }

  const createOrUpdateOrderItem = () => {
    setIsSubmitting(true)

    doAxios(
      !isUpdateForm
        ? `/orders/${orderId}/order-items`
        : `/orders/${orderId}/order-items/${id}`,
      !isUpdateForm ? "post" : "put",
      true,
      getCreateUpdateData()
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
    getAndSetVatRates(setVatRates, true)

    if (!id) {
      setLoading(false)
      return
    }

    doAxios(`/orders/${orderId}/order-items/${id}`, "get", true)
      .then((res) => {
        handleResData(res, setResData)

        setResData(
          produce((draft) => {
            draft.vat = draft.vat * 100
          })
        )
      })
      .catch((err) => {
        handleForbiddenAccess(err, setNotification, router, "orders")
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
            label={texts.orders.orderItems.form.common.name.label}
            defaultValue={resData?.name}
            handleChange={(e) => handleChange(e)}
            error={inputErrors.name}
          />
          <InputField
            disabled={readonly}
            id="count"
            label={texts.orders.orderItems.form.common.count.label}
            defaultValue={resData?.count}
            handleChange={(e) => handleChange(e)}
            error={inputErrors.count}
            type="number"
            min={1}
            max={200}
          />
          <InputField
            disabled={readonly}
            id="cost"
            label={texts.orders.orderItems.form.common.cost.label}
            defaultValue={resData?.cost}
            handleChange={(e) => handleChange(e)}
            error={inputErrors.cost}
            type="number"
            min={0}
            max={99999}
          />
          <Select
            disabled={readonly}
            id="vat"
            value={resData?.vat}
            label={texts.orders.orderItems.form.common.vat.label}
            values={vatRates}
            handleChange={(e) => handleVatChange(e)}
            specificValueDisplayFormat="%v%"
            error={inputErrors.vat}
          />

          {readonly && (
            <InputField
              disabled={true}
              id="cost_with_vat"
              type="number"
              defaultValue={resData?.cost_with_vat}
              label={texts.orders.orderItems.form.view.cost_with_vat.label}
            />
          )}

          <Button
            handleClick={() => nav("order-items", router, false, orderId)}
            text={texts.orders.form.view.button}
          />
          {!readonly && (
            <Button
              className="ml-1"
              disabled={isSubmitting}
              handleClick={createOrUpdateOrderItem}
              text={
                isUpdateForm
                  ? texts.orders.orderItems.form.update.button
                  : texts.orders.orderItems.form.create.button
              }
            />
          )}
        </Box>
      </Container>
    )
}
export default OrderItemForm
