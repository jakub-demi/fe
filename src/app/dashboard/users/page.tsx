"use client"

import React, { useEffect, useRef, useState } from "react"
import { GridColDef } from "@mui/x-data-grid"
import log from "@/utils/log"
import doAxios from "@/utils/doAxios"
import { UserT } from "@/types"
import { handleResData } from "@/utils"
import SpinLoader from "@/components/_common/SpinLoader"
import ActionsMenu from "@/components/_common/datagrid/ActionsMenu"
import texts from "@/texts"
import DataGrid from "@/components/_common/datagrid/DataGrid"
import DataGridRender from "@/components/_common/datagrid/DataGridRender"

const UsersPage = () => {
  const dataGridRef = useRef<HTMLDivElement | null>(null)
  const [tableWidth, setTableWidth] = useState<number>()

  const [tableData, setTableData] = useState<UserT[]>([])
  const [colsCount, setColsCount] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)

  const loadData = () => {
    doAxios("/users", "get", true).then((res) => {
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
      field: "firstname",
      headerName: texts.users.dataGrid.headers.firstname,
      type: "string",
      width: getColumnWidth(),
      minWidth: 100,
      editable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "lastname",
      headerName: texts.users.dataGrid.headers.lastname,
      type: "string",
      width: getColumnWidth(),
      minWidth: 100,
      editable: false,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "email",
      headerName: texts.users.dataGrid.headers.email,
      type: "string",
      editable: false,
      width: getColumnWidth(),
      minWidth: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "is_admin",
      headerName: texts.users.dataGrid.headers.is_admin,
      type: "boolean",
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
        const userId = (params.row as { id: number }).id
        return (
          <ActionsMenu
            datagridPage="users"
            id={userId}
            handleReloadData={() => loadData()}
          />
        )
      },
    },
  ]

  useEffect(() => {
    setColsCount(columns.length)
  }, [columns.length])

  return (
    <DataGridRender
      dataGridRef={dataGridRef}
      isLoading={isLoading}
      dataGridJsxElement={
        <DataGrid
          rows={tableData}
          columns={columns}
          createRoute="users.create"
        />
      }
    />
  )
}
export default UsersPage
