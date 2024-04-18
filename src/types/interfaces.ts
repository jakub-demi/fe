import { notificationStoreSeverityT, UserT } from "@/types"

export interface AuthStoreI {
  user: UserT | null
  authed: boolean
  setUser: (user: UserT | null) => void
  logout: () => void
  login: () => void
}

export interface NotificationStoreI {
  notification: {
    text: string | null
    severity: notificationStoreSeverityT | undefined
  }
  setNotification: (
    notification: string,
    severity?: notificationStoreSeverityT
  ) => void
  clearNotification: () => void
}
