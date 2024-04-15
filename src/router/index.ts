import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

type RouteMappings = {
  [key: string]: { url: string; title: string }
}

const routes = (): RouteMappings => ({
  home: {
    url: "/",
    title: "Home",
  },
  e404: {
    url: "/not-found",
    title: "Not Found",
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

const nav = (
  name: string,
  router: AppRouterInstance,
  replace: boolean = false
): void => {
  const url = routes()[name]["url"]

  !replace ? router.push(url) : router.replace(url)
}

export const getRoute = (name: string): string => {
  return routes()[name]["url"]
}

export const getRouteTitle = (pathname: string) => {
  for (const route in routes()) {
    if (routes()[route].url === pathname) {
      return routes()[route].title
    }
  }
  return null
}

export const doesRouteExist = (pathname: string) => {
  for (const route in routes()) {
    const routeUrl = routes()[route].url
    if (routeUrl === pathname && routeUrl !== "/not-found") {
      return true
    }
  }
  return false
}

export default nav
