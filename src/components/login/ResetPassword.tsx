import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import doAxios from "@/utils/doAxios"
import ResetPasswordConfirmation from "@/components/login/ResetPasswordConfirmation"
import { useState } from "react"
import log from "@/utils/log"

const ResetPasswordDialog = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const formJson = Object.fromEntries((formData as any).entries())
    const email = formJson.email
    log("email", email)

    doAxios("/forgot-password", "post", false, formData)
      .then(() => {
        handleClose()

        setConfirmationOpen(true)
      })
      .catch((err) => {
        setEmailError(err.response.data.message)
      })
  }

  const handleCloseDialog = () => {
    setEmailError(null)
    handleClose()
  }

  return (
    <>
      <ResetPasswordConfirmation
        open={confirmationOpen}
        handleClose={() => setConfirmationOpen(false)}
      />

      <Dialog
        className=""
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => submit(event),
        }}
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent className="w-80">
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          {emailError && <div className="text-sm text-error">{emailError}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit">Reset</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default ResetPasswordDialog
