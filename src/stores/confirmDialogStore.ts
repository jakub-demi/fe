import { create } from "zustand"
import { produce } from "immer"
import { ConfirmDialogStoreI } from "@/types/interfaces"

const confirmDialogStore = create<ConfirmDialogStoreI>()((set) => ({
  confirmDialog: {
    title: null as string | null,
    description: undefined as string | undefined,
    confirmText: "Confirm" as string | undefined,
    declineText: "Decline" as string | undefined,
    confirmationFunction: void 0 as unknown as () => void,
  },

  setConfirmDialog: (
    title: string,
    description?: string,
    confirmText?: string,
    declineText?: string,
    func?: () => void
  ): void =>
    set(
      produce((state) => {
        state.confirmDialog.title = title
        state.confirmDialog.description = description
        state.confirmDialog.confirmText = confirmText
        state.confirmDialog.declineText = declineText
        state.confirmDialog.confirmationFunction = func
      })
    ),

  clearConfirmDialog: (): void =>
    set(
      produce((state) => {
        state.confirmDialog.title = null
        state.confirmDialog.confirmationFunction = void 0
      })
    ),
}))

export default confirmDialogStore
