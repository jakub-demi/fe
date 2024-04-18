"use client"

import React, { useEffect, useState } from "react"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import notificationStore from "@/stores/notificationStore"
import { useShallow } from "zustand/react/shallow"
import log from "@/utils/log"

const Notification = () => {
  const notification = notificationStore(
    useShallow((state) => state.notification)
  )

  const clearNotification = notificationStore(
    (state) => state.clearNotification
  )

  const [open, setOpen] = useState(false)

  useEffect(() => {
    notification.text && setOpen(true)
  }, [notification.text])

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)

    clearNotification()
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.text}
        </Alert>
      </Snackbar>
    </div>
  )
}
export default Notification
