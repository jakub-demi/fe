import { create } from "zustand"
import { UserAvatarT, UserT } from "@/types"
import { persist } from "zustand/middleware"
import { AuthStoreI } from "@/types/interfaces"
import { produce } from "immer"
import log from "@/utils/log"

const authStore = create<AuthStoreI>()(
  persist(
    (set, get) => ({
      user: null as UserT | null,
      authed: false,
      menuPinned: true,

      setUser: (user: UserT | null): void =>
        set(
          produce((state) => {
            state.user = user
          })
        ),

      logout: (): void =>
        set(
          produce((state) => {
            state.authed = false
            state.user = null
          })
        ),

      login: (): void =>
        set(
          produce((state) => {
            state.authed = true
          })
        ),

      setMenuPinned: (pinned: boolean) =>
        set(
          produce((state) => {
            state.menuPinned = pinned
          })
        ),

      setUserAvatar: (avatar: UserAvatarT) =>
        set(
          produce((state) => {
            state.user && (state.user.avatar = avatar)
          })
        ),

      getUserAvatar: () => {
        const user = get().user
        return user?.avatar?.image && process.env.NEXT_PUBLIC_API_BASE_URL
          ? process.env.NEXT_PUBLIC_API_BASE_URL + "/" + user.avatar.image
          : undefined
      },
    }),
    {
      name: "authStore",
    }
  )
)

export default authStore
