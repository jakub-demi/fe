const log = (message: string, data: any) => {
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

  const color = callingLoc.includes("Store.ts") ? "93" : "32"

  console.log(
    `\x1b[${color}m%s\x1b[0m`,
    `------- <${callingLoc}> ------\n`,
    `${message}:`,
    data
  )
}

export default log
