import React from "react"
import { DataGrid, GridColDef, GridSlots } from "@mui/x-data-grid"
import DataGridToolbar from "@/components/_common/datagrid/DataGridToolbar"
import nav, { RouterParam } from "@/router"
import { useRouter } from "next/navigation"
import log from "@/utils/log"
import notificationStore from "@/stores/notificationStore"

const DataGridFrame = ({
  rowEditMode = false,
  rows,
  columns,
  createRoute,
  createRouteParams,
  backBtn = false,
  processRowUpdateHandler,
  processRowUpdateErrorHandler,
  createRouteAccess = true,
}: {
  rowEditMode?: boolean
  rows: Array<any>
  columns: GridColDef[]
  createRoute: string
  createRouteParams?: RouterParam
  backBtn?: boolean
  processRowUpdateHandler?: (newRow: any, oldRow: any) => void
  processRowUpdateErrorHandler?: (error: any) => void
  createRouteAccess?: boolean
}): React.JSX.Element => {
  const router = useRouter()
  const showForbiddenAccessNotification = notificationStore(
    (state) => state.showForbiddenAccessNotification
  )

  const createRouteClick = () => {
    createRouteAccess
      ? nav(createRoute, router, false, createRouteParams)
      : showForbiddenAccessNotification()
  }

  const Toolbar = () => (
    <DataGridToolbar
      handleClick={createRouteClick}
      backBtn={backBtn}
    />
  )

  return (
    <DataGrid
      editMode={rowEditMode ? "row" : "cell"}
      processRowUpdate={
        processRowUpdateHandler
          ? (newRow, oldRow) => {
              processRowUpdateHandler(newRow, oldRow)
              return newRow
            }
          : (newRow, oldRow) => {
              return newRow
            }
      }
      onProcessRowUpdateError={
        processRowUpdateErrorHandler
          ? (error) => processRowUpdateErrorHandler(error)
          : void 0
      }
      sx={{
        height: rows.length === 0 ? 200 : "auto",
      }}
      rows={rows}
      columns={columns}
      slots={{
        toolbar: Toolbar as GridSlots["toolbar"],
      }}
    />
  )
}
export default DataGridFrame
