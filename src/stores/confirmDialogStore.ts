import { create } from "zustand"
import { produce } from "immer"
import { ConfirmDialogStoreI } from "@/types/interfaces"
import texts from "@/texts"

const confirmDialogStore = create<ConfirmDialogStoreI>()((set) => ({
  confirmDialog: {
    title: null as string | null,
    description: undefined as string | undefined,
    confirmText: texts.confirmDialog.button.confirm as string | undefined,
    declineText: texts.confirmDialog.button.decline as string | undefined,
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
        state.confirmDialog.description = undefined
        state.confirmDialog.confirmText = texts.confirmDialog.button.confirm
        state.confirmDialog.declineText = texts.confirmDialog.button.decline
        state.confirmDialog.confirmationFunction = void 0
      })
    ),
}))

export default confirmDialogStore
