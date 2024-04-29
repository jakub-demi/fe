export type CredentialsT = {
  email: string
  password: string
}

export type UserT = {
  id: bigint
  email: string
  firstname: string
  lastname: string
  is_admin: boolean
}

export type notificationStoreSeverityT =
  | "success"
  | "info"
  | "error"
  | "warning"

export type OrderT = {
  id: bigint
  order_number: number
  due_date: Date
  payment_date: Date | null
  created_at: Date
}

export type OrderDataCreateT = {
  due_date: Date | string
}

export type OrderDataUpdateT = {
  due_date: Date | string
  payment_date: Date | string | null
  created_at: Date | string
}

export type OrderItemT = {
  id: bigint
  order_id: bigint
  name: string
  count: number
  cost: number
  vat: number
  cost_with_vat: number
}

export type OrderItemDataCreateUpdateT = {
  name: string
  count: number
  cost?: number
  vat: number
  cost_with_vat?: number
}
