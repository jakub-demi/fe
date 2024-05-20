"use client"

import React, { useEffect, useState } from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Box, Container } from "@mui/material"
import texts from "@/texts"
import Button from "@/components/_common/Button"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import dayjs, { Dayjs } from "dayjs"
import notificationStore from "@/stores/notificationStore"
import doAxios from "@/utils/doAxios"
import {
  FormErrorT,
  NumKeyStrValT,
  OrderDataCreateT,
  OrderDataUpdateT,
  OrderT,
  UserT,
  OrderCategoryT,
  OrderStatusT,
  StrKeyStrValT,
} from "@/types"
import log from "@/utils/log"
import {
  formatDate,
  getKeyValObjectFromArray,
  handleChangeData,
  handleDaytimeChange,
  handleForbiddenAccess,
  handleInputErrors,
  handleMultiSelectChange,
  handleResData,
  handleSelectChange,
} from "@/utils"
import Preloader from "@/components/_common/Preloader"
import DateTimePicker from "@/components/_common/form/DateTimePicker"
import nav from "@/router"
import { useRouter } from "next/navigation"
import MultiSelect from "@/components/_common/form/MultiSelect"
import { produce } from "immer"
import authStore from "@/stores/authStore"
import InputField from "@/components/_common/form/InputField"
import Select from "@/components/_common/form/Select"
import { getAndSetOrderStatuses } from "@/utils/axiosCalls"

const OrderForm = ({
  id,
  readonly = false,
}: {
  id?: number
  readonly?: boolean
}) => {
  const isUpdateForm: boolean = id !== undefined

  const user = authStore((state) => state.user)

  const router = useRouter()

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

  const [customer, setCustomer] = useState({
    customer_name: "",
    customer_address: "",
  })

  const [orderUsersToChooseFrom, setOrderUsersToChooseFrom] =
    useState<NumKeyStrValT>({})

  const [orderChoosenUsers, setOrderChoosenUsers] = useState<number[]>([])

  const [orderCategories, setOrderCategories] = useState<OrderCategoryT[]>([])

  const [orderCategoriesToChooseFrom, setOrderCategoriesToChooseFrom] =
    useState<NumKeyStrValT>({})

  const [selectedOrderCategory, setSelectedOrderCategory] = useState<number>()

  const [orderStatuses, setOrderStatuses] = useState<OrderStatusT[]>([])
  const [orderStatusesToChooseFrom, setOrderStatusesToChooseFrom] =
    useState<StrKeyStrValT>({})
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<string>()

  const inputErrorsDefaultState = {
    due_date: undefined as FormErrorT,
    payment_date: undefined as FormErrorT,
    created_at: undefined as FormErrorT,
    order_users: undefined as FormErrorT,
    customer_name: undefined as FormErrorT,
    customer_address: undefined as FormErrorT,
    category_id: undefined as FormErrorT,
    order_status: undefined as FormErrorT,
  }
  const [inputErrors, setInputErrors] = useState(inputErrorsDefaultState)

  const getCreateData = (): OrderDataCreateT => {
    return {
      due_date: formatDate(selectedDueDate),
      order_users: orderChoosenUsers,
      customer_name: customer.customer_name,
      customer_address: customer.customer_address,
      category_id: selectedOrderCategory,
      status: selectedOrderStatus,
    }
  }

  const getUpdateData = (): OrderDataUpdateT => {
    return {
      due_date: formatDate(selectedDueDate),
      payment_date: formatDate(selectedPaymentDate),
      created_at: formatDate(selectedCreatedAtDate),
      order_users: orderChoosenUsers,
      customer_name: customer.customer_name,
      customer_address: customer.customer_address,
      category_id: selectedOrderCategory,
      status: selectedOrderStatus,
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
    doAxios("/users", "get", true).then((res) =>
      handleResData(res, setAllUsers)
    )

    doAxios("/order-categories", "get", true).then((res) =>
      handleResData(res, setOrderCategories)
    )

    getAndSetOrderStatuses(setOrderStatuses)

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
  }, [])

  useEffect(() => {
    if (!resData) return

    setSelectedDueDate(dayjs(resData.due_date))
    resData.payment_date && setSelectedPaymentDate(dayjs(resData.payment_date))
    setSelectedCreatedAtDate(dayjs(resData.created_at))

    setCustomer(
      produce((draft) => {
        draft.customer_name = resData.customer_name
        draft.customer_address = resData.customer_address
      })
    )

    resData.category && setSelectedOrderCategory(resData.category.id)

    setLoading(false)
  }, [resData])

  useEffect(() => {
    let users: NumKeyStrValT = {}
    const choosenUsers: number[] = []

    if (id && resData) {
      resData.order_users.forEach((user) => {
        choosenUsers.push(user.id)
      })
    }

    if (user?.is_admin) {
      allUsers.forEach((user) => {
        users[user.id] = user.fullName
      })
    } else {
      const filteredUsers = allUsers.filter((user) =>
        choosenUsers.includes(user.id)
      )
      users = getKeyValObjectFromArray(filteredUsers, "id", "fullName")

      user && (users[user.id] = user.fullName)
      if (!id && user) {
        choosenUsers.push(user.id)
      }
    }

    setOrderUsersToChooseFrom(users)
    setOrderChoosenUsers(choosenUsers)
  }, [allUsers])

  useEffect(() => {
    setOrderCategoriesToChooseFrom(getKeyValObjectFromArray(orderCategories))
  }, [orderCategories])

  useEffect(() => {
    setOrderStatusesToChooseFrom(
      getKeyValObjectFromArray(orderStatuses, "name", "value")
    )
  }, [orderStatuses])

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
              handleChange={(e) => handleDaytimeChange(e, setSelectedDueDate)}
            />

            {isUpdateForm && (
              <>
                <DateTimePicker
                  disabled={readonly}
                  label={texts.orders.form.update.paymentDate.label}
                  defaultValue={selectedPaymentDate}
                  minDateTime={selectedPaymentDate}
                  error={inputErrors.payment_date}
                  handleChange={(e) =>
                    handleDaytimeChange(e, setSelectedPaymentDate)
                  }
                />

                <DateTimePicker
                  disabled={readonly}
                  label={texts.orders.form.update.createdAtDate.label}
                  defaultValue={selectedCreatedAtDate}
                  minDateTime={selectedCreatedAtDate}
                  error={inputErrors.created_at}
                  handleChange={(e) =>
                    handleDaytimeChange(e, setSelectedCreatedAtDate)
                  }
                />
              </>
            )}

            <MultiSelect
              disabled={readonly || (!user?.is_admin && !id)}
              id="order_users"
              label={texts.orders.form.common.orderUsers.label}
              selectedValues={orderChoosenUsers}
              valuesToChooseFrom={orderUsersToChooseFrom}
              handleChange={(e) =>
                handleMultiSelectChange(e, setOrderChoosenUsers, true)
              }
            />

            <InputField
              disabled={readonly}
              id="customer_name"
              label={texts.orders.form.common.customerName.label}
              defaultValue={customer.customer_name}
              handleChange={(e) => handleChangeData(e, setCustomer)}
              error={inputErrors.customer_name}
            />

            <InputField
              disabled={readonly}
              id="customer_address"
              label={texts.orders.form.common.customerAddress.label}
              defaultValue={customer.customer_address}
              handleChange={(e) => handleChangeData(e, setCustomer)}
              error={inputErrors.customer_address}
            />

            <Select
              disabled={readonly}
              id="category_id"
              label={texts.orders.form.common.category.label}
              value={selectedOrderCategory}
              values={orderCategoriesToChooseFrom}
              handleChange={(e) =>
                handleSelectChange(e, setSelectedOrderCategory, true)
              }
              noValueShowNothingSelected={true}
              error={inputErrors.category_id}
            />

            <Select
              disabled={readonly}
              id="order_status"
              label={texts.orders.form.common.orderStatus.label}
              value={selectedOrderStatus}
              values={orderStatusesToChooseFrom}
              handleChange={(e) =>
                handleSelectChange(e, setSelectedOrderStatus)
              }
              noValueShowNothingSelected={true}
              error={inputErrors.order_status}
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
