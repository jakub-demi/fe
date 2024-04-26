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
import { OrderItemDataCreateUpdateT } from "@/types"
import Select from "@/components/_common/form/Select"
import { produce } from "immer"

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
    count: 1,
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
      !isUpdateForm ? `/order-items/store/${orderId}` : `/order-items/${id}`,
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
    doAxios("/vat-rates", "get", true).then((res) => {
      const rates = res.data.data.map((rate: number) => {
        return rate * 100
      })
      setVatRates(rates)
    })

    if (!id) {
      setLoading(false)
      return
    }

    doAxios(`/order-items/${id}`, "get", true).then((res) => {
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
            id="name"
            label={texts.orders.orderItems.form.common.name.label}
            defaultValue={resData?.name}
            handleChange={(e) => handleChange(e)}
            error={inputErrors.name}
          />
          <InputField
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
            id="cost"
            label={texts.orders.orderItems.form.common.cost.label}
            defaultValue={resData?.cost}
            handleChange={(e) => handleChange(e)}
            error={inputErrors.cost}
            type="number"
            min={0}
            max={99999}
          />

          {/*<InputField*/}
          {/*  id="vat"*/}
          {/*  label={texts.orders.orderItems.form.common.cost.label}*/}
          {/*  defaultValue={resData?.cost}*/}
          {/*  handleChange={(e) => handleChange(e)}*/}
          {/*  error={inputErrors.cost}*/}
          {/*  type="number"*/}
          {/*/>*/}

          <Select
            id="vat"
            value={resData?.vat}
            label={texts.orders.orderItems.form.common.vat.label}
            values={vatRates}
            handleChange={(e) => handleVatChange(e)}
            specificValueDisplayFormat="%v%"
          />

          <Button
            handleClick={() => nav("orders.items", router, false, orderId)}
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
