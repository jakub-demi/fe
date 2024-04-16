import { create } from "zustand"
import { UserT } from "@/types"
import { persist } from "zustand/middleware"
import { AuthStoreI } from "@/types/interfaces"
import { produce } from "immer"
import log from "@/utils/log"

const authStore = create<AuthStoreI>()(
  persist(
    (set) => ({
      user: null as UserT | null,
      authed: false,

      setUser: (user: UserT | null): void =>
        set(
          produce((state) => {
            //log("(setUser) state.user before", state.user)

            state.user = user

            //log("(setUser) state.user after", state.user)
          })
        ),

      logout: (): void =>
        set(
          produce((state) => {
            //log("(logout) state.authed before", state.authed)
            //log("(logout) state.user before", state.authed)

            state.authed = false
            state.user = null

            //log("(logout) state.authed after", state.authed)
            //log("(logout) state.user after", state.authed)
          })
        ),

      login: (): void =>
        set(
          produce((state) => {
            //log("(login) state.authed before", state.authed)

            state.authed = true

            //log("(login) state.authed after", state.authed)
          })
        ),
    }),
    {
      name: "authStore",
    }
  )
)

export default authStore
