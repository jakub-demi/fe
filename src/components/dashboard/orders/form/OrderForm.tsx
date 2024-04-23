"use client"

import React, { useEffect, useState } from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Box, Container } from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import texts from "@/texts"
import Button from "@/components/_common/Button"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import dayjs, { Dayjs } from "dayjs"
import notificationStore from "@/stores/notificationStore"
import doAxios from "@/utils/doAxios"
import { OrderDataCreateT, OrderDataUpdateT } from "@/types"
import log from "@/utils/log"
import { formatDate, handleInputErrors, handleResData } from "@/utils"
import Preloader from "@/components/_common/Preloader"

const OrderForm = ({ id }: { id?: number }) => {
  const isUpdateForm: boolean = id !== undefined

  const tomorrow = dayjs().add(1, "day")

  const setNotification = notificationStore((state) => state.setNotification)

  const [loading, setLoading] = useState(true)

  const [resData, setResData] = useState<OrderDataUpdateT>()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [selectedDueDate, setSelectedDueDate] = useState<Dayjs>(tomorrow)

  const [selectedPaymentDate, setSelectedPaymentDate] =
    useState<Dayjs>(tomorrow)

  const [selectedCreatedAtDate, setSelectedCreatedAtDate] =
    useState<Dayjs>(tomorrow)

  const [inputErrors, setInputErrors] = useState({
    due_date: undefined as string[] | undefined,
    payment_date: undefined as string[] | undefined,
    created_at: undefined as string[] | undefined,
  })

  const handleChange = (
    e: Dayjs | null,
    setter: React.Dispatch<React.SetStateAction<Dayjs>>
  ) => {
    if (!e) return

    setter(e)
  }

  const getCreateData = (): OrderDataCreateT => {
    return {
      due_date: formatDate(selectedDueDate),
    }
  }

  const getUpdateData = (): OrderDataUpdateT => {
    return {
      due_date: formatDate(selectedDueDate),
      payment_date: formatDate(selectedPaymentDate),
      created_at: formatDate(selectedCreatedAtDate),
    }
  }

  const createOrUpdateOrder = () => {
    setIsSubmitting(true)

    doAxios(
      !isUpdateForm ? "/orders" : `/orders/${id}`,
      !isUpdateForm ? "post" : "put",
      true,
      !isUpdateForm ? getCreateData() : getUpdateData()
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

    doAxios(`/orders/${id}`, "get", true).then((res) => {
      handleResData(res, setResData)
    })
  }, [])

  useEffect(() => {
    if (!resData) return

    setSelectedDueDate(dayjs(resData.due_date))
    resData.payment_date && setSelectedPaymentDate(dayjs(resData.payment_date))
    setSelectedCreatedAtDate(dayjs(resData.created_at))

    setLoading(false)
  }, [resData])

  if (loading) {
    return <Preloader />
  } else
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
          <Box>
            <DateTimePicker
              onChange={(e) => handleChange(e, setSelectedDueDate)}
              label={texts.orders.form.common.dueDate.label}
              className="w-full mb-2"
              defaultValue={selectedDueDate}
              minDateTime={selectedDueDate}
              slotProps={{
                textField: {
                  error: inputErrors.due_date !== undefined,
                  label:
                    inputErrors.due_date !== undefined && inputErrors.due_date,
                },
              }}
            />

            {isUpdateForm && (
              <>
                <DateTimePicker
                  onChange={(e) => handleChange(e, setSelectedPaymentDate)}
                  label={texts.orders.form.update.paymentDate.label}
                  className="w-full mb-2"
                  defaultValue={selectedPaymentDate}
                  minDateTime={selectedPaymentDate}
                  slotProps={{
                    textField: {
                      error: inputErrors.payment_date !== undefined,
                      label:
                        inputErrors.payment_date !== undefined &&
                        inputErrors.payment_date,
                    },
                  }}
                />

                <DateTimePicker
                  onChange={(e) => handleChange(e, setSelectedCreatedAtDate)}
                  label={texts.orders.form.update.createdAtDate.label}
                  className="w-full mb-2"
                  defaultValue={selectedCreatedAtDate}
                  minDateTime={selectedCreatedAtDate}
                  slotProps={{
                    textField: {
                      error: inputErrors.created_at !== undefined,
                      label:
                        inputErrors.created_at !== undefined &&
                        inputErrors.created_at,
                    },
                  }}
                />
              </>
            )}

            <Button
              disabled={isSubmitting}
              handleClick={createOrUpdateOrder}
              text={
                isUpdateForm
                  ? texts.orders.form.update.button
                  : texts.orders.form.create.button
              }
            />
          </Box>
        </Container>
      </LocalizationProvider>
    )
}
export default OrderForm
