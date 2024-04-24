import { notificationStoreSeverityT, UserT } from "@/types"

export interface AuthStoreI {
  user: UserT | null
  authed: boolean
  setUser: (user: UserT | null) => void
  logout: () => void
  login: () => void
  menuPinned: boolean
  setMenuPinned: (pinned: boolean) => void
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

export interface ConfirmDialogStoreI {
  confirmDialog: {
    title: string | null
    description?: string
    confirmText?: string
    declineText?: string
    confirmationFunction: () => void
  }
  setConfirmDialog: (
    title: string,
    description?: string,
    confirmText?: string,
    declineText?: string,
    func?: () => void
  ) => void
  clearConfirmDialog: () => void
}
