import { create } from "zustand"
import { NotificationStoreI } from "@/types/interfaces"
import { produce } from "immer"
import { notificationStoreSeverityT } from "@/types"
import texts from "@/texts"

const notificationStore = create<NotificationStoreI>()((set) => ({
  notification: {
    text: null as string | null,
    severity: undefined as notificationStoreSeverityT | undefined,
  },

  setNotification: (
    notification: string,
    severity?: notificationStoreSeverityT
  ): void =>
    set(
      produce((state) => {
        state.notification.text = notification
        state.notification.severity = severity
      })
    ),

  showForbiddenAccessNotification: (): void =>
    set(
      produce((state) => {
        state.notification.text = texts.notification.errors.access_denied
        state.notification.severity = "error"
      })
    ),

  clearNotification: (): void =>
    set(
      produce((state) => {
        state.notification.text = null
        state.notification.severity = "info"
      })
    ),
}))

export default notificationStore
