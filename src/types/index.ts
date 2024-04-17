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
