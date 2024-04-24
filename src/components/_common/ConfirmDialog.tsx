import * as React from "react"
import Button from "@/components/_common/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import confirmDialogStore from "@/stores/confirmDialogStore"
import { useShallow } from "zustand/react/shallow"
import { useEffect } from "react"
import texts from "@/texts"

const ConfirmDialog = (): React.JSX.Element => {
  const confirmDialog = confirmDialogStore(
    useShallow((state) => state.confirmDialog)
  )
  const confirmationFunction = confirmDialogStore(
    (state) => state.confirmDialog.confirmationFunction
  )
  const clearConfirmDialog = confirmDialogStore(
    (state) => state.clearConfirmDialog
  )

  const [open, setOpen] = React.useState(false)

  const handleDecline = () => {
    setOpen(false)
    setTimeout(clearConfirmDialog, 150)
  }

  const handleConfirmation = () => {
    handleDecline()
    confirmationFunction()
  }

  useEffect(() => {
    confirmDialog.title && setOpen(true)
  }, [confirmDialog.title])

  return (
    <Dialog
      open={open}
      onClose={handleDecline}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{confirmDialog.title}</DialogTitle>
      {confirmDialog.description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmDialog.description}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button
          text={confirmDialog.confirmText ?? texts.confirmDialog.button.confirm}
          handleClick={handleConfirmation}
        />
        <Button
          text={confirmDialog.declineText ?? texts.confirmDialog.button.decline}
          handleClick={handleDecline}
        />
      </DialogActions>
    </Dialog>
  )
}
export default ConfirmDialog
