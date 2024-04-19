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
  payment_date: Date
  created_at: Date
}
