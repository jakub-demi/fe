"use client"

import React from "react"
import TextField from "@mui/material/TextField"
import texts from "@/texts"
import Button from "@mui/material/Button"

const PasswordChangePage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    //
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          className="w-full mb-2.5"
          label={texts.user.changePassword.form.oldPassword}
          variant="outlined"
          type="password"
        />
        <TextField
          className="w-full mb-2.5"
          label={texts.user.changePassword.form.newPassword}
          variant="outlined"
          type="password"
        />
        <TextField
          className="w-full mb-2.5"
          label={texts.user.changePassword.form.newPasswordRepeat}
          variant="outlined"
          type="password"
        />
        <Button variant="contained">
          {texts.user.changePassword.form.saveBtn}
        </Button>
      </form>
    </div>
  )
}
export default PasswordChangePage
