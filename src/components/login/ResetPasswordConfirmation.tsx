import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

const ResetPasswordConfirmation = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Reset Password Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Password reset confirmation email was sent to you, check your inbox.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default ResetPasswordConfirmation
