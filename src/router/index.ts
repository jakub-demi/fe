import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

type RouteMappings = {
  [key: string]: { url: string; title: string }
}

export type RouterParam = string | string[] | number | number[]

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

  // Dashboard Orders pages
  "orders.create": {
    url: "/dashboard/orders/create",
    title: "Order - Create",
  },
  "orders.edit": {
    url: "/dashboard/orders/edit/{param}",
    title: "Order - Edit",
  },
  "orders.view": {
    url: "/dashboard/orders/view/{param}",
    title: "Order - View",
  },

  // Dashboard Order Items pages
  "order-items": {
    url: "/dashboard/orders/view/{param}/items",
    title: "Order Items",
  },
  "order-items.create": {
    url: "/dashboard/orders/view/{param}/items/create",
    title: "Order Item - Create",
  },
  "order-items.edit": {
    url: "/dashboard/orders/view/{param}/items/edit/{param}",
    title: "Order Item - Edit",
  },
  "order-items.view": {
    url: "/dashboard/orders/view/{param}/items/view/{param}",
    title: "Order Item - View",
  },
})

const isValidRoute = (route: string): void => {
  if (!(route in routes())) {
    throw new Error(`Route '${route}' does not exist in routes list!`)
  }
}

const paramHandler = (url: string, param: RouterParam): string | undefined => {
  const matches = url.match(/\{param}/g)
  if (!matches) {
    console.warn(
      `No '{param}' found in route's url: '${url}', params are not required, they will be omitted.`
    )
    return url
  }

  if (typeof param === "number") param = `${param}`

  const numMatches = matches.length
  if (typeof param === "string") {
    if (numMatches !== 1) {
      throw new Error(
        `Invalid number of params (1) for route's url: '${url}', exactly (${numMatches}) params are required.`
      )
    }
    return url.replace(/\{param}/, param)
  } else if (Array.isArray(param)) {
    if (param.length !== numMatches) {
      throw new Error(
        `Invalid number of params (${param.length}) provided for route's url: '${url}', exactly (${numMatches}) params are required.`
      )
    }
    let index = 0
    return url.replace(/\{param}/g, () => `${param[index++]}`)
  }
}

const nav = (
  name: string,
  router: AppRouterInstance,
  replace: boolean = false,
  param?: RouterParam
): void => {
  isValidRoute(name)

  let url = routes()[name]["url"]

  if (param) {
    url = paramHandler(url, param) ?? url
  } else if (url.includes("{param}")) {
    throw new Error("Route which requires param(s) - param is not present.")
  }

  !replace ? router.push(url) : router.replace(url)
}

export const getRoute = (name: string): string => {
  return routes()[name]["url"]
}

export const getRouteTitle = (pathname: string): string | null => {
  const regex = /\/\d+/
  for (const route in routes()) {
    const url = routes()[route].url
    if (url === pathname || url === pathname.replace(regex, "/{param}")) {
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
