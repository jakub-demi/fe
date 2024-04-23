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

  // Dashboard routes:
  dashboard: {
    url: "/dashboard",
    title: "Dashboard",
  },
  orders: {
    url: "/dashboard/orders",
    title: "Orders",
  },
  users: {
    url: "/dashboard/users",
    title: "Users",
  },

  // Dashboard User routes:
  profile: {
    url: "/dashboard/user/profile",
    title: "Profile",
  },
  changePassword: {
    url: "/dashboard/user/password",
    title: "Change Password",
  },

  // Order action pages
  "order.create": {
    url: "/dashboard/orders/create",
    title: "Order - Create",
  },
  "order.edit": {
    url: "/dashboard/orders/edit",
    title: "Order - Edit",
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
  replace: boolean = false,
  param?: string | number
): void => {
  isValidRoute(name)

  const url = routes()[name]["url"]

  !replace
    ? param
      ? router.push(`${url}/${param}`)
      : router.push(url)
    : param
      ? router.replace(`${url}/${param}`)
      : router.replace(url)
}

export const getRoute = (name: string): string => {
  return routes()[name]["url"]
}

export const getRouteTitle = (pathname: string): string | null => {
  const regex = /\/\d+$/
  for (const route in routes()) {
    const url = routes()[route].url
    if (url === pathname || url === pathname.replace(regex, "")) {
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
