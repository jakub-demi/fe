import React from "react"
import {
  DataGrid,
  GridCellEditStopParams,
  GridColDef,
  GridEventListener,
  GridSlots,
  useGridApiContext,
  useGridApiEventHandler,
} from "@mui/x-data-grid"
import DataGridToolbar from "@/components/_common/datagrid/DataGridToolbar"
import nav, { RouterParam } from "@/router"
import { useRouter } from "next/navigation"
import log from "@/utils/log"
import DataGridChangeHandler from "@/components/_common/datagrid/DataGridChangeHandler"

const DataGridFrame = ({
  rows,
  columns,
  createRoute,
  createRouteParams,
  backBtn = false,
  onCellEditStopHandler,
}: {
  rows: Array<any>
  columns: GridColDef[]
  createRoute: string
  createRouteParams?: RouterParam
  backBtn?: boolean
  onCellEditStopHandler?: (params: GridCellEditStopParams) => void
}) => {
  const router = useRouter()

  //const apiRef = useGridApiContext() //todo:dev

  const handleEvent: GridEventListener<"columnsChange"> = (
    params,
    event,
    details
  ) => {
    log("[handleEvent] - params", params)
  }

  // // todo:dev
  // apiRef.current.subscribeEvent(
  //   "columnsChange",
  //   handleEvent
  // )

  const Toolbar = () => (
    <DataGridToolbar
      handleClick={() => nav(createRoute, router, false, createRouteParams)}
      backBtn={backBtn}
    />
  )

  return (
    <DataGrid
      // [Begin] todo:dev
      // onCellEditStop={
      //   onCellEditStopHandler
      //     ? (params) => onCellEditStopHandler(params)
      //     : void(0)
      // }
      // [End]
      sx={{
        height: rows.length === 0 ? 200 : "auto",
      }}
      rows={rows}
      columns={columns}
      slots={{
        toolbar: Toolbar as GridSlots["toolbar"],
      }}
    >
      {/*<DataGridChangeHandler/> todo:dev */}
    </DataGrid>
  )
}
export default DataGridFrame
