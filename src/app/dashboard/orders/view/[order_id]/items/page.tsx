"use client"

import React, { useEffect, useRef, useState } from "react"
import { GridColDef, GridRenderEditCellParams } from "@mui/x-data-grid"
import log from "@/utils/log"
import doAxios from "@/utils/doAxios"
import { OrderItemT } from "@/types"
import { areObjectsEqual, handleForbiddenAccess, handleResData } from "@/utils"
import SpinLoader from "@/components/_common/SpinLoader"
import ActionsMenu from "@/components/_common/datagrid/ActionsMenu"
import texts from "@/texts"
import DataGrid from "@/components/_common/datagrid/DataGrid"
import notificationStore from "@/stores/notificationStore"
import confirmDialogStore from "@/stores/confirmDialogStore"
import VatRenderEditCell from "@/components/dashboard/orders/items/datagrid/VatRenderEditCell"
import { useRouter } from "next/navigation"

const OrderItemsPage = ({ params }: { params: { order_id: number } }) => {
  const orderId = params.order_id
  const router = useRouter()

  const setNotification = notificationStore((state) => state.setNotification)
  const setConfirmDialog = confirmDialogStore((state) => state.setConfirmDialog)

  const dataGridRef = useRef<HTMLDivElement | null>(null)
  const [tableWidth, setTableWidth] = useState<number>()

  const [tableData, setTableData] = useState<OrderItemT[]>([])
  const [colsCount, setColsCount] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)

  const loadData = () => {
    doAxios(`/orders/${orderId}/order-items`, "get", true)
      .then((res) => {
        handleResData(res, setTableData)
      })
      .catch((err) => {
        handleForbiddenAccess(err, setNotification, router, "orders")
      })
  }

  useEffect(() => {
    if (dataGridRef.current) {
      setTableWidth(dataGridRef.current.getBoundingClientRect()?.width)
    }

    loadData()
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [tableData])

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
      valueFormatter: (value) => value + " €",
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
      valueFormatter: (value) => value * 100 + "%",
      renderEditCell: (params: GridRenderEditCellParams) => (
        <VatRenderEditCell {...params} />
      ),
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
      valueFormatter: (value) => value + " €",
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
            datagridPage="order-items"
            id={[orderId, orderItemId]}
            handleReloadData={() => loadData()}
          />
        )
      },
    },
  ]

  useEffect(() => {
    setColsCount(columns.length)
  }, [columns.length])

  const inRowEditUpdate = (row: OrderItemT) => {
    const orderItemId = row.id
    doAxios(`/orders/${orderId}/order-items/${orderItemId}`, "put", true, row)
      .then((res) => {
        setNotification(res.data.message)
      })
      .catch((err) => {
        setNotification(err.response.data.message, "error")
      })
      .finally(() => loadData())
  }

  const processRowUpdateHandler = (newRow: OrderItemT, oldRow: OrderItemT) => {
    if (areObjectsEqual(newRow, oldRow)) return

    setConfirmDialog(
      texts.orders.orderItems.dataGrid.confirmDialog.inRowEditConfirm,
      undefined,
      undefined,
      undefined,
      () => inRowEditUpdate(newRow),
      () => loadData()
    )
  }

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
          rowEditMode={true}
          rows={tableData}
          columns={columns}
          createRoute="order-items.create"
          createRouteParams={orderId}
          backBtnRoute="orders"
          processRowUpdateHandler={(newRow: OrderItemT, oldRow: OrderItemT) =>
            processRowUpdateHandler(newRow, oldRow)
          }
        />
      )}
    </div>
  )
}
export default OrderItemsPage
