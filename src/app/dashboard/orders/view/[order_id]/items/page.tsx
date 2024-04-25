"use client"

import React, { useEffect, useRef, useState } from "react"
import { DataGrid, GridColDef, GridSlots } from "@mui/x-data-grid"
import log from "@/utils/log"
import doAxios from "@/utils/doAxios"
import { OrderItemT } from "@/types"
import { handleResData } from "@/utils"
import SpinLoader from "@/components/_common/SpinLoader"
import ActionsMenu from "@/components/_common/datagrid/ActionsMenu"
import DataGridToolbar from "@/components/_common/datagrid/DataGridToolbar"
import texts from "@/texts"
import nav from "@/router"
import { useRouter } from "next/navigation"

const OrdersPage = ({ params }: { params: { order_id: number } }) => {
  const orderId = params.order_id

  const dataGridRef = useRef<HTMLDivElement | null>(null)
  const [tableWidth, setTableWidth] = useState<number>()

  const router = useRouter()

  const [tableData, setTableData] = useState<OrderItemT[]>([])
  //const [gridRows, setGridRows] = useState<OrderItemT[]>([])
  const [colsCount, setColsCount] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)

  const loadData = () => {
    doAxios(`/order-items/${orderId}`, "get", true).then((res) => {
      handleResData(res, setTableData)
    })
  }

  useEffect(() => {
    if (dataGridRef.current) {
      setTableWidth(dataGridRef.current.getBoundingClientRect()?.width)
    }

    loadData()

    if (tableData[0]) {
      setColsCount(Object.keys(tableData[0]).length - 1)
    }

    setIsLoading(false)
  }, [])

  // useEffect(() => {
  //   const rows: OrderItemT[] = []
  //   tableData?.forEach((orderItem, idx) => {
  //     rows.push({
  //       id: orderItem.id,
  //       order_id: orderItem.order_id,
  //       name: orderItem.name,
  //       count: orderItem.count,
  //       cost: orderItem.cost,
  //       vat: orderItem.vat,
  //       cost_with_vat: orderItem.cost_with_vat,
  //     })
  //   })
  //
  //   if (rows[0]) {
  //     setColsCount(Object.keys(rows[0]).length)
  //   }
  //
  //   setGridRows(
  //     produce((draft) => {
  //       return rows
  //     })
  //   )
  // }, [tableData])

  const getColumnWidth = (): number => {
    if (!(tableWidth && colsCount)) return 100

    return tableWidth / colsCount
  }

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: texts.orders.orderItems.dataGrid.headers.name,
      type: "string",
      width: getColumnWidth(),
      minWidth: 100,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "count",
      headerName: texts.orders.orderItems.dataGrid.headers.count,
      type: "number",
      editable: true,
      width: getColumnWidth(),
      minWidth: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "cost",
      headerName: texts.orders.orderItems.dataGrid.headers.cost,
      type: "number",
      width: getColumnWidth(),
      minWidth: 100,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "vat",
      headerName: texts.orders.orderItems.dataGrid.headers.vat,
      type: "number",
      width: getColumnWidth(),
      minWidth: 100,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "cost_with_vat",
      headerName: texts.orders.orderItems.dataGrid.headers.cost_with_vat,
      type: "number",
      width: getColumnWidth(),
      minWidth: 100,
      editable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "Actions",
      headerName: texts.dataGrid.headers.actions,
      width: getColumnWidth(),
      minWidth: 100,
      type: "actions",
      renderCell: (params) => {
        const orderItemId = (params.row as { id: number }).id
        return (
          <ActionsMenu
            datagridPage="orders.items"
            id={orderItemId}
            handleReloadData={() => loadData()}
          />
        )
      },
    },
  ]

  const Toolbar = () => (
    <DataGridToolbar handleClick={() => nav("orders.items.create", router)} />
  )

  return (
    <div
      ref={dataGridRef}
      className="w-full"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <SpinLoader />
        </div>
      ) : (
        <DataGrid
          rows={tableData}
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
