import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import doAxios from "@/utils/doAxios"
import ResetPasswordConfirmation from "@/components/login/ResetPasswordConfirmation"
import { useEffect, useState } from "react"
import log from "@/utils/log"
import { ChangePasswordT } from "@/types"
import InputField from "@/components/_common/form/InputField"
import texts from "@/texts"
import { handleInputErrors } from "@/utils"
import { extShowPasswordStateHandler } from "@/utils/inputField"
import cltm from "@/utils/cltm"

const ChangePasswordDialog = ({
  open,
  handleClose,
  changePasswordData,
}: {
  open: boolean
  handleClose: () => void
  changePasswordData: ChangePasswordT
}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false)

  const initialInputErrorsState = {
    password: undefined as string[] | undefined,
    password_confirmation: undefined as string[] | undefined,
    token: undefined as string[] | undefined,
    email: undefined as string[] | undefined,
  }
  const [inputErrors, setInputErrors] = useState(initialInputErrorsState)

  const [showPassword, setShowPassword] = useState(false)

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    formData.append("email", changePasswordData.email)
    formData.append("token", changePasswordData.token)

    const formJson = Object.fromEntries((formData as any).entries())
    log("formData", formJson, "lightYellow")

    doAxios("/reset-password", "post", false, formData)
      .then(() => {
        handleClose()

        setConfirmationOpen(true)
      })
      .catch((err) => {
        handleInputErrors(err, setInputErrors)
      })
  }

  const handleCloseDialog = () => {
    setInputErrors(initialInputErrorsState)
    handleClose()
  }

  return (
    <>
      <ResetPasswordConfirmation
        open={confirmationOpen}
        handleClose={() => setConfirmationOpen(false)}
        passwordChange={true}
      />

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => submit(event),
        }}
      >
        <DialogTitle>{texts.login.changePasswordDialog.title}</DialogTitle>
        <DialogContent className="w-96">
          <InputField
            id="password"
            label={texts.login.changePasswordDialog.inputs.password}
            type="password"
            className="mt-2"
            error={inputErrors.password}
            extShowPasswordStateHandler={(update) =>
              extShowPasswordStateHandler(update, showPassword, setShowPassword)
            }
          />
          <InputField
            id="password_confirmation"
            label={
              texts.login.changePasswordDialog.inputs.password_confirmation
            }
            type="password"
            error={inputErrors.password_confirmation}
            extShowPasswordStateHandler={(update) =>
              extShowPasswordStateHandler(update, showPassword, setShowPassword)
            }
          />
          {inputErrors.email && (
            <div
              className={cltm(
                "text-sm text-error",
                inputErrors.token && "mb-1"
              )}
            >
              {inputErrors.email[0]}
            </div>
          )}
          {inputErrors.token && (
            <div className="text-sm text-error">{inputErrors.token[0]}</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {texts.login.changePasswordDialog.buttons.cancel}
          </Button>
          <Button type="submit">
            {texts.login.changePasswordDialog.buttons.submit}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default ChangePasswordDialog
