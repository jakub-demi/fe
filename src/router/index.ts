import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

type RouteMappings = {
  [key: string]: { url: string; title: string }
}

const routes = (): RouteMappings => ({
  home: {
    url: "/",
    title: "Home",
  },
  login: {
    url: "/login",
    title: "Login",
  },
  dashboard: {
    url: "/dashboard",
    title: "Dashboard",
  },
})

const nav = (name: string, router: AppRouterInstance, push: boolean = true) => {
  const url = routes()[name]["url"]

  push ? router.push(url) : router.replace(url)
}

export default nav
