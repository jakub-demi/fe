import React from "react"

export const extShowPasswordStateHandler = (
  update: boolean,
  state: boolean,
  setter: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
  const currentState = state

  if (update) {
    setter(!state)
  }

  return currentState
}
