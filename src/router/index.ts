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
  profile: {
    url: "/dashboard/user/profile",
    title: "Profile",
  },
  orders: {
    url: "/dashboard/orders",
    title: "Orders",
  },
  users: {
    url: "/dashboard/users",
    title: "Users",
  },
})

const isValidRoute = (route: string): void => {
  if (!(route in routes())) {
    throw new Error(`Route '${route}' does not exist in routes list!`)
  }
}

const nav = (
  name: string,
  router: AppRouterInstance,
  replace: boolean = false
): void => {
  isValidRoute(name)

  const url = routes()[name]["url"]

  !replace ? router.push(url) : router.replace(url)
}

export const getRoute = (name: string): string => {
  return routes()[name]["url"]
}

export const getRouteTitle = (pathname: string): string | null => {
  for (const route in routes()) {
    if (routes()[route].url === pathname) {
      return routes()[route].title
    }
  }
  return null
}

export const getRouteTitleByName = (name: string): string => {
  return routes()[name]["title"]
}

export const doesRouteExist = (pathname: string): boolean => {
  for (const route in routes()) {
    const routeUrl = routes()[route].url
    if (routeUrl === pathname && routeUrl !== "/not-found") {
      return true
    }
  }
  return false
}

export default nav
