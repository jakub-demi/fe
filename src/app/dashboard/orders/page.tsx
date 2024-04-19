"use client"

import React, { useEffect, useRef, useState } from "react"
import { DataGrid, GridApi, GridColDef } from "@mui/x-data-grid"
import log from "@/utils/log"
import doAxios from "@/utils/doAxios"
import { OrderT } from "@/types"
import { handleResData } from "@/utils"
import { produce } from "immer"
import SpinLoader from "@/components/_common/SpinLoader"
import ActionsMenu from "@/components/dashboard/orders/ActionsMenu"

const OrdersPage = () => {
  const dataGridRef = useRef<HTMLDivElement | null>(null)
  const [tableWidth, setTableWidth] = useState<number>()

  const [tableData, setTableData] = useState<OrderT[]>()
  const [gridRows, setGridRows] = useState<OrderT[]>([])

  const loadData = () => {
    doAxios("/orders", "get", true).then((res) => {
      log("res", res)
      handleResData(res, setTableData)
    })
  }

  useEffect(() => {
    loadData()

    if (!dataGridRef.current) return
    setTableWidth(dataGridRef.current?.getBoundingClientRect()?.width)
  }, [])

  useEffect(() => {
    log("tableData", tableData)
    const rows: OrderT[] = []
    tableData?.forEach((order, idx) => {
      rows.push({
        id: order.id,
        order_number: order.order_number,
        due_date: new Date(order.due_date),
        payment_date: new Date(order.payment_date),
        created_at: new Date(order.created_at),
      })
    })

    setGridRows(
      produce((draft) => {
        return rows
      })
    )
  }, [tableData])

  const columns: GridColDef[] = [
    {
      field: "order_number",
      headerName: "Order Number",
      type: "number",
      width: tableWidth ? tableWidth / gridRows.length : 100,
      minWidth: 100,
      editable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "due_date",
      headerName: "Due Date",
      type: "dateTime",
      editable: true,
      width: tableWidth ? tableWidth / gridRows.length : 100,
      minWidth: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "payment_date",
      headerName: "Payment Date",
      type: "dateTime",
      width: tableWidth ? tableWidth / gridRows.length : 100,
      minWidth: 100,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "created_at",
      headerName: "Created At",
      type: "dateTime",
      width: tableWidth ? tableWidth / gridRows.length : 100,
      minWidth: 100,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: tableWidth ? tableWidth / gridRows.length : 100,
      minWidth: 100,
      type: "actions",
      renderCell: (params) => {
        const onClick = (e: React.MouseEvent) => {
          e.stopPropagation() // don't select this row after clicking

          // const api: GridApi = params.api;
          // const thisRow: Record<string, any> = [];
          //const thisRow = api.getAllColumns().filter((c) => c.field !== "__check__" && !!c)

          // api
          //   .getAllColumns()
          //   .filter((c) => c.field !== "__check__" && !!c)
          //   .forEach(
          //     (c) => (thisRow.push(params.row) /*thisRow[c.field] = params.getValue(params.id, c.field)*/)
          //   );

          //return alert(JSON.stringify(thisRow, null, 4));
          // log("clicked", thisRow)

          log("params", params.row)
        }

        //return <button className="py-2 px-4 bg-primary hover:bg-primary-hover rounded-md text-white" onClick={onClick}>Click</button>;

        return (
          <ActionsMenu
            id={(params.row as { id: number }).id}
            setter={setTableData}
          />
        )
      },
    },
  ]

  return (
    <div
      ref={dataGridRef}
      className="w-full"
    >
      {gridRows.length === 0 ? (
        <div className="flex items-center justify-center">
          <SpinLoader />
        </div>
      ) : (
        <DataGrid
          rows={gridRows}
          columns={columns}
        />
      )}
    </div>
  )
}
export default OrdersPage
