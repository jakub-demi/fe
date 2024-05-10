export type CredentialsT = {
  email: string
  password: string
}

export type UserAvatarT = {
  image: string | null
  thumb: string | null
}

export type UserT = {
  id: number
  email: string
  firstname: string
  lastname: string
  fullName: string
  is_admin: boolean
  avatar?: UserAvatarT
}

export type notificationStoreSeverityT =
  | "success"
  | "info"
  | "error"
  | "warning"

export type OrderT = {
  id: number
  order_number: number
  due_date: Date
  payment_date: Date | null
  created_at: Date
  has_access: boolean
  customer_name: string
  customer_address: string
  order_users: UserT[]
}

export type OrderDataGridT = {
  id: number
  order_number: number
  due_date: Date
  payment_date: Date | null
  created_at: Date
  has_access: boolean
  order_users: UserT[]
}

export type OrderDataCreateT = {
  due_date: Date | string
  order_users: number[]
  customer_name: string
  customer_address: string
}

export type OrderDataUpdateT = {
  due_date: Date | string
  payment_date: Date | string | null
  created_at: Date | string
  order_users: number[]
  customer_name: string
  customer_address: string
}

export type OrderUsersToChooseFromT = {
  [key: number]: string
}

export type OrderItemT = {
  id: number
  order_id: number
  name: string
  count: number
  cost: number
  vat: number
  cost_with_vat: number
}

export type OrderItemDataCreateUpdateT = {
  name: string
  count?: number
  cost?: number
  vat: number
  cost_with_vat?: number
}

export type UserDataCreateUpdateT = {
  firstname: string
  lastname: string
  email: string
  password: string
  password_confirmation: string
  is_admin: boolean | 0 | 1
}

export type ChangePasswordT = {
  token: string
  email: string
}

export type setNotificationT = (
  notification: string,
  severity?: notificationStoreSeverityT
) => void

export type FormErrorT = string[] | undefined
