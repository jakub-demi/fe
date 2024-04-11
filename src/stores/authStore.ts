import { create } from "zustand"
import { UserT } from "@/types"
import { persist } from "zustand/middleware"
import { AuthStoreI } from "@/types/interfaces"

const authStore = create<AuthStoreI>()(
  persist(
    (set) => ({
      user: null as null | UserT,
      authed: false,

      setUser: (user: null | UserT): void => set({ user: user }),

      logout: (): void =>
        set({
          authed: false,
          user: null,
        }),

      login: (user: UserT) => set({ user: user }),
    }),
    {
      name: "authStore",
    }
  )
)

export default authStore
