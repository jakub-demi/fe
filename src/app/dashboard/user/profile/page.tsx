"use client"

import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import MaterialIcon from "@/components/_common/MaterialIcon"
import Button from "@mui/material/Button"
import { UserT } from "@/types"
import authStore from "@/stores/authStore"
import texts from "@/texts"

const ProfilePage = () => {
  const user = authStore.getState().user

  const [userData, setUserData] = useState<UserT | null>(user)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    //
  }

  return (
    <div>
      <div>
        <MaterialIcon
          icon="account_circle"
          className="text-9xl"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          defaultValue={user?.email}
          className="w-full mb-2.5"
          id="email"
          label={texts.user.profile.form.email}
          variant="outlined"
        />
        <TextField
          defaultValue={user?.firstname}
          className="w-full mb-2.5"
          id="firstname"
          label={texts.user.profile.form.firstname}
          variant="outlined"
        />
        <TextField
          defaultValue={user?.lastname}
          className="w-full mb-2.5"
          id="lastname"
          label={texts.user.profile.form.lastname}
          variant="outlined"
        />
        <Button variant="contained">{texts.user.profile.form.saveBtn}</Button>
      </form>
    </div>
  )
}
export default ProfilePage
