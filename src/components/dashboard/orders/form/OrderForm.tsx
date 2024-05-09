"use client"

import React, { useEffect, useState } from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Box, Container, SelectChangeEvent } from "@mui/material"
import texts from "@/texts"
import Button from "@/components/_common/Button"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import dayjs, { Dayjs } from "dayjs"
import notificationStore from "@/stores/notificationStore"
import doAxios from "@/utils/doAxios"
import {
  OrderChoosenUsersT,
  OrderDataCreateT,
  OrderDataUpdateT,
  OrderT,
  UserT,
} from "@/types"
import log from "@/utils/log"
import {
  bigIntToInt,
  formatDate,
  handleForbiddenAccess,
  handleInputErrors,
  handleResData,
} from "@/utils"
import Preloader from "@/components/_common/Preloader"
import DateTimePicker from "@/components/_common/form/DateTimePicker"
import nav from "@/router"
import { useRouter } from "next/navigation"
import MultiSelect from "@/components/_common/form/MultiSelect"
import { produce } from "immer"
import authStore from "@/stores/authStore"

const OrderForm = ({
  id,
  readonly = false,
}: {
  id?: number
  readonly?: boolean
}) => {
  const isUpdateForm: boolean = id !== undefined

  const router = useRouter()

  const user = authStore((state) => state.user)

  const tomorrow = dayjs().add(1, "day")

  const setNotification = notificationStore((state) => state.setNotification)

  const [loading, setLoading] = useState(true)

  const [resData, setResData] = useState<OrderT>()

  const [allUsers, setAllUsers] = useState<UserT[]>([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [selectedDueDate, setSelectedDueDate] = useState<Dayjs>(tomorrow)

  const [selectedPaymentDate, setSelectedPaymentDate] =
    useState<Dayjs>(tomorrow)

  const [selectedCreatedAtDate, setSelectedCreatedAtDate] =
    useState<Dayjs>(tomorrow)

  const [orderUsersToChooseFrom, setOrderUsersToChooseFrom] =
    useState<OrderChoosenUsersT>({})

  const [orderChoosenUsers, setOrderChoosenUsers] = useState<number[]>([])

  const inputErrorsDefaultState = {
    due_date: undefined as string[] | undefined,
    payment_date: undefined as string[] | undefined,
    created_at: undefined as string[] | undefined,
  }
  const [inputErrors, setInputErrors] = useState(inputErrorsDefaultState)

  const handleChange = (
    e: Dayjs | null,
    setter: React.Dispatch<React.SetStateAction<Dayjs>>
  ) => {
    if (!e) return

    setter(e)
  }

  const handleOrderUsersChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    setOrderChoosenUsers(
      produce((draft) => {
        return typeof value === "string"
          ? value.split(",").map(Number)
          : value.map(Number)
      })
    )
  }

  const getCreateData = (): OrderDataCreateT => {
    return {
      due_date: formatDate(selectedDueDate),
      order_users: orderChoosenUsers,
    }
  }

  const getUpdateData = (): OrderDataUpdateT => {
    return {
      due_date: formatDate(selectedDueDate),
      payment_date: formatDate(selectedPaymentDate),
      created_at: formatDate(selectedCreatedAtDate),
      order_users: orderChoosenUsers,
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

    doAxios(`/orders/${id}`, "get", true)
      .then((res) => {
        !readonly &&
          handleForbiddenAccess(res, setNotification, router, "orders")
        handleResData(res, setResData)
      })
      .catch((err) => {
        handleForbiddenAccess(err, setNotification, router, "orders")
      })

    doAxios("/users", "get", true).then((res) =>
      handleResData(res, setAllUsers)
    )
  }, [])

  useEffect(() => {
    if (!resData) return

    setSelectedDueDate(dayjs(resData.due_date))
    resData.payment_date && setSelectedPaymentDate(dayjs(resData.payment_date))
    setSelectedCreatedAtDate(dayjs(resData.created_at))

    const users: OrderChoosenUsersT = {}
    log("mám prístup?", resData.has_access)
    //todo:dev - ak som admin a na "create", tak zobraziť všetkých userov, ak nie som, tak iba zobraziť momentálneho usera;
    // ak som na "edit" page, tak zobraziť iba userov, ktorí sú priradení k objednávke (ak som admin, tak všetkých userov);
    if (resData.has_access) {
      allUsers.forEach((user) => {
        users[bigIntToInt(user.id)] = user.fullName
      })
    } else {
      user && (users[bigIntToInt(user.id)] = user.fullName)
    }
    setOrderUsersToChooseFrom(users)

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
              disabled={readonly}
              label={texts.orders.form.common.dueDate.label}
              defaultValue={selectedDueDate}
              minDateTime={selectedDueDate}
              error={inputErrors.due_date}
              handleChange={(e) => handleChange(e, setSelectedDueDate)}
            />

            {isUpdateForm && (
              <>
                <DateTimePicker
                  disabled={readonly}
                  label={texts.orders.form.update.paymentDate.label}
                  defaultValue={selectedPaymentDate}
                  minDateTime={selectedPaymentDate}
                  error={inputErrors.payment_date}
                  handleChange={(e) => handleChange(e, setSelectedPaymentDate)}
                />

                <DateTimePicker
                  disabled={readonly}
                  label={texts.orders.form.update.createdAtDate.label}
                  defaultValue={selectedCreatedAtDate}
                  minDateTime={selectedCreatedAtDate}
                  error={inputErrors.created_at}
                  handleChange={(e) =>
                    handleChange(e, setSelectedCreatedAtDate)
                  }
                />
              </>
            )}

            <MultiSelect
              disabled={readonly}
              id="order_users"
              label={texts.orders.form.common.orderUsers.label}
              selectedValues={orderChoosenUsers}
              valuesToChooseFrom={orderUsersToChooseFrom}
              handleChange={handleOrderUsersChange}
            />

            <Button
              handleClick={() => nav("orders", router)}
              text={texts.orders.form.view.button}
            />
            {!readonly && (
              <Button
                className="ml-1"
                disabled={isSubmitting}
                handleClick={createOrUpdateOrder}
                text={
                  isUpdateForm
                    ? texts.orders.form.update.button
                    : texts.orders.form.create.button
                }
              />
            )}
          </Box>
        </Container>
      </LocalizationProvider>
    )
}
export default OrderForm
