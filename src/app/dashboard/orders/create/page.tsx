"use client"

import * as React from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import dayjs, { Dayjs } from "dayjs"
import { Box, Container } from "@mui/material"
import doAxios from "@/utils/doAxios"
import notificationStore from "@/stores/notificationStore"
import { useState } from "react"
import texts from "@/texts"
import Button from "@/components/_common/Button"
import log from "@/utils/log"

const OrdersCreatePage = () => {
  const tomorrow = dayjs().add(1, "day")

  const setNotification = notificationStore((state) => state.setNotification)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date>(tomorrow.toDate())

  const handleChange = (e: Dayjs | null) => {
    if (!e) return

    setSelectedDate(e.toDate())
  }

  const createOrder = () => {
    setIsSubmitting(true)

    doAxios("/orders", "post", true, {
      due_date: selectedDate,
    })
      .then((res) => {
        setNotification(res.data.message)
      })
      .catch((err) => {
        setNotification(err.response.data.message, "error")
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Box>
          <DateTimePicker
            onChange={(e) => handleChange(e)}
            label={texts.orders.form.common.dueDate.label}
            className="w-full mb-2"
            defaultValue={tomorrow}
            minDateTime={tomorrow}
          />
          <Button
            disabled={isSubmitting}
            handleClick={createOrder}
            text={texts.orders.form.create.button}
          />
        </Box>
      </Container>
    </LocalizationProvider>
  )
}
export default OrdersCreatePage
