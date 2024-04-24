"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  DataGrid,
  GridApi,
  GridColDef,
  GridSlots,
  GridToolbarContainer,
} from "@mui/x-data-grid"
import log from "@/utils/log"
import doAxios from "@/utils/doAxios"
import { OrderT } from "@/types"
import { handleResData } from "@/utils"
import { produce } from "immer"
import SpinLoader from "@/components/_common/SpinLoader"
import ActionsMenu from "@/components/_common/datagrid/ActionsMenu"
import DataGridToolbar from "@/components/_common/datagrid/DataGridToolbar"
import texts from "@/texts"
import nav from "@/router"
import { useRouter } from "next/navigation"
import MenuItem from "@mui/material/MenuItem"

const OrdersPage = () => {
  const dataGridRef = useRef<HTMLDivElement | null>(null)
  const [tableWidth, setTableWidth] = useState<number>()

  const router = useRouter()

  const [tableData, setTableData] = useState<OrderT[]>()
  const [gridRows, setGridRows] = useState<OrderT[]>([])
  const [colsCount, setColsCount] = useState<number>()

  const loadData = () => {
    doAxios("/orders", "get", true).then((res) => {
      handleResData(res, setTableData)
    })
  }

  useEffect(() => {
    loadData()

    if (!dataGridRef.current) return
    setTableWidth(dataGridRef.current?.getBoundingClientRect()?.width)
  }, [])

  useEffect(() => {
    const rows: OrderT[] = []
    tableData?.forEach((order, idx) => {
      rows.push({
        id: order.id,
        order_number: order.order_number,
        due_date: new Date(order.due_date),
        payment_date: order.payment_date ? new Date(order.payment_date) : null,
        created_at: new Date(order.created_at),
      })
    })

    if (rows[0]) {
      setColsCount(Object.keys(rows[0]).length)
    }

    setGridRows(
      produce((draft) => {
        return rows
      })
    )
  }, [tableData])

  const getColumnWidth = (): number => {
    if (!(tableWidth && colsCount)) return 100

    return tableWidth / colsCount
  }

  const columns: GridColDef[] = [
    {
      field: "order_number",
      headerName: "Order Number",
      type: "number",
      width: getColumnWidth(),
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
      width: getColumnWidth(),
      minWidth: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "payment_date",
      headerName: "Payment Date",
      type: "dateTime",
      width: getColumnWidth(),
      minWidth: 100,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "created_at",
      headerName: "Created At",
      type: "dateTime",
      width: getColumnWidth(),
      minWidth: 100,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: getColumnWidth(),
      minWidth: 100,
      type: "actions",
      renderCell: (params) => {
        const orderId = (params.row as { id: number }).id
        return (
          <ActionsMenu
            datagridPage="orders"
            id={orderId}
            handleReloadData={() => loadData()}
            additionalActionItems={
              <MenuItem
                onClick={() => nav("orders.items", router, false, orderId)}
              >
                Order Items
              </MenuItem>
            }
          />
        )
      },
    },
  ]

  const Toolbar = () => (
    <DataGridToolbar handleClick={() => nav("orders.create", router)} />
  )

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
          slots={{
            toolbar: Toolbar as GridSlots["toolbar"],
          }}
        />
      )}
    </div>
  )
}
export default OrdersPage
