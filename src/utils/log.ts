const logColors = {
  red: "31",
  green: "32",
  yellow: "33",
  blue: "34",
  magenta: "35",
  cyan: "36",
  gray: "37",
  darkGray: "90",
  lightRed: "91",
  lightGreen: "92",
  lightYellow: "93",
  lightBlue: "94",
  lightMagenta: "95",
  lightCyan: "96",
  white: "97",
}

type logColor = keyof typeof logColors

const log = (
  message: string,
  data: any,
  color?: logColor,
  devOnly: boolean = false
) => {
  if (
    devOnly &&
    process.env.NEXT_PUBLIC_DEV_ENV &&
    process.env.NEXT_PUBLIC_DEV_ENV !== "true"
  )
    return

  const stack = new Error().stack
  let callingLoc = "unknown"
  if (stack) {
    callingLoc = stack
      .split("\n")[2]
      .trim()
      .replace(/^at /, "")
      .replace("webpack-internal:///", "")
      .replace("eval ", "")
    callingLoc = callingLoc.substring(0, callingLoc.indexOf(":")) + ")"
  }

  const logColor = color
    ? logColors[color]
    : callingLoc.includes("Store.ts")
      ? "93"
      : "32"

  console.log(
    `\x1b[${logColor}m%s\x1b[0m`,
    `------- <${callingLoc}> ------\n`,
    `${message}:`,
    data
  )
}

export default log
