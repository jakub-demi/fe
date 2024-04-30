import { create } from "zustand"
import { produce } from "immer"
import { ConfirmDialogStoreI } from "@/types/interfaces"
import texts from "@/texts"

const confirmDialogStore = create<ConfirmDialogStoreI>()((set) => ({
  confirmDialog: {
    title: null as string | null,
    description: undefined as string | undefined,
    confirmBtnText: texts.confirmDialog.button.confirm as string | undefined,
    declineBtnText: texts.confirmDialog.button.decline as string | undefined,
    confirmationFunction: void 0 as unknown as () => void,
    declineFunction: void 0 as unknown as () => void | undefined,
  },

  setConfirmDialog: (
    title: string,
    description?: string,
    confirmBtnText?: string,
    declineBtnText?: string,
    confirmationFunc?: () => void,
    declineFunc?: () => void
  ): void =>
    set(
      produce((state) => {
        state.confirmDialog.title = title
        state.confirmDialog.description = description
        state.confirmDialog.confirmBtnText = confirmBtnText
        state.confirmDialog.declineBtnText = declineBtnText
        state.confirmDialog.confirmationFunction = confirmationFunc
        state.confirmDialog.declineFunction = declineFunc
      })
    ),

  clearConfirmDialog: (): void =>
    set(
      produce((state) => {
        state.confirmDialog.title = null
        state.confirmDialog.description = undefined
        state.confirmDialog.confirmBtnText = texts.confirmDialog.button.confirm
        state.confirmDialog.declineBtnText = texts.confirmDialog.button.decline
        state.confirmDialog.confirmationFunction = void 0
        state.confirmDialog.declineFunction = undefined
      })
    ),
}))

export default confirmDialogStore
