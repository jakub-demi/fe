import React from "react"
import { GridEventListener, useGridApiContext } from "@mui/x-data-grid"
import log from "@/utils/log"

//todo:dev - maybe will not be required
const DataGridChangeHandler = () => {
  const apiRef = useGridApiContext()

  const handleEvent: GridEventListener<"columnsChange"> = (
    params,
    event,
    details
  ) => {
    log("[handleEvent] - params", params)
  }

  apiRef.current.subscribeEvent("columnsChange", handleEvent)

  return undefined
}
export default DataGridChangeHandler
