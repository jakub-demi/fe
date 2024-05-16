"use client"

import React, { useEffect, useRef, useState } from "react"
import { GridColDef } from "@mui/x-data-grid"
import log from "@/utils/log"
import doAxios from "@/utils/doAxios"
import { OrderCategoryT } from "@/types"
import { handleResData } from "@/utils"
import SpinLoader from "@/components/_common/SpinLoader"
import ActionsMenu from "@/components/_common/datagrid/ActionsMenu"
import texts from "@/texts"
import DataGrid from "@/components/_common/datagrid/DataGrid"
import authStore from "@/stores/authStore"

const OrderCategoriesPage = () => {
  const userIsAdmin = Boolean(authStore((state) => state.user?.is_admin))

  const dataGridRef = useRef<HTMLDivElement | null>(null)
  const [tableWidth, setTableWidth] = useState<number>()

  const [tableData, setTableData] = useState<OrderCategoryT[]>([])
  const [colsCount, setColsCount] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)

  const loadData = () => {
    doAxios("/order-categories", "get", true).then((res) => {
      handleResData(res, setTableData)
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
      headerName: texts.orderCategories.dataGrid.headers.name,
      type: "string",
      width: getColumnWidth(),
      minWidth: 100,
      editable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "slug",
      headerName: texts.orderCategories.dataGrid.headers.slug,
      type: "string",
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
        const orderCategoryId = (params.row as OrderCategoryT).id
        return (
          <ActionsMenu
            datagridPage="order-categories"
            id={orderCategoryId}
            handleReloadData={() => loadData()}
            permissions={{
              view: true,
              edit: userIsAdmin,
              delete: userIsAdmin,
            }}
          />
        )
      },
    },
  ]

  useEffect(() => {
    setColsCount(columns.length)
  }, [columns.length])

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
          createRoute="order-categories.create"
          createRouteAccess={userIsAdmin}
        />
      )}
    </div>
  )
}
export default OrderCategoriesPage
