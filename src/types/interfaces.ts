import { UserT } from "@/types"

export interface AuthStoreI {
  user: UserT | null
  authed: boolean
  setUser: (user: UserT | null) => void
  logout: () => void
  login: () => void
}
