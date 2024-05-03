import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import texts from "@/texts"

const ResetPasswordConfirmation = ({
  open,
  handleClose,
  passwordChange = false,
}: {
  open: boolean
  handleClose: () => void
  passwordChange?: boolean
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {!passwordChange
          ? texts.login.resetPasswordConfirmationDialog.reset.title
          : texts.login.resetPasswordConfirmationDialog.change.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {!passwordChange
            ? texts.login.resetPasswordConfirmationDialog.reset.description
            : texts.login.resetPasswordConfirmationDialog.change.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
        >
          {texts.login.resetPasswordConfirmationDialog.okBtn}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default ResetPasswordConfirmation
