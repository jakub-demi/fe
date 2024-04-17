import { create } from "zustand"
import { NotificationStoreI } from "@/types/interfaces"
import { produce } from "immer"
import { notificationStoreSeverityT } from "@/types"

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

  clearNotification: (): void =>
    set(
      produce((state) => {
        state.notification.text = null
        state.notification.severity = undefined
      })
    ),
}))

export default notificationStore
