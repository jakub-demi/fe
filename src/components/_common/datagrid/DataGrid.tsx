import React from "react"
import { DataGrid, GridColDef, GridSlots } from "@mui/x-data-grid"
import DataGridToolbar from "@/components/_common/datagrid/DataGridToolbar"
import nav, { RouterParam } from "@/router"
import { useRouter } from "next/navigation"

const DataGridFrame = ({
  rows,
  columns,
  createRoute,
  createRouteParams,
  backBtn = false,
}: {
  rows: Array<any>
  columns: GridColDef[]
  createRoute: string
  createRouteParams?: RouterParam
  backBtn?: boolean
}) => {
  const router = useRouter()

  const Toolbar = () => (
    <DataGridToolbar
      handleClick={() => nav(createRoute, router, false, createRouteParams)}
      backBtn={backBtn}
    />
  )

  return (
    <DataGrid
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
