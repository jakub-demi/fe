import {
  notificationStoreSeverityT,
  setNotificationT,
  UserAvatarT,
  UserT,
} from "@/types"

export interface AuthStoreI {
  user: UserT | null
  authed: boolean
  menuPinned: boolean
  avatar?: string
  setUser: (user: UserT | null) => void
  logout: () => void
  login: () => void
  setMenuPinned: (pinned: boolean) => void
  setUserAvatar: (avatar: UserAvatarT) => void
  getUserAvatar: () => string | undefined
}

export interface NotificationStoreI {
  notification: {
    text: string | null
    severity: notificationStoreSeverityT | undefined
  }
  setNotification: setNotificationT
  showForbiddenAccessNotification: () => void
  clearNotification: () => void
}

export interface ConfirmDialogStoreI {
  confirmDialog: {
    title: string | null
    description?: string
    confirmBtnText?: string
    declineBtnText?: string
    confirmationFunction: () => void
    declineFunction?: () => void
  }
  setConfirmDialog: (
    title: string,
    description?: string,
    confirmBtnText?: string,
    declineBtnText?: string,
    confirmationFunc?: () => void,
    declineFunc?: () => void
  ) => void
  clearConfirmDialog: () => void
}
