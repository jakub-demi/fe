import * as React from "react"
import Button from "@/components/_common/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { useEffect, useState } from "react"
import texts from "@/texts"
import doAxios from "@/utils/doAxios"
import { formatDate, handleResData } from "@/utils"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import MenuItem from "@mui/material/MenuItem"
import SpinLoader from "@/components/_common/SpinLoader"
import log from "@/utils/log"
import { OrderStatusHistoryDialogT } from "@/types"
import Avatars from "@/components/dashboard/orders/datagrid/Avatars"

const OrderStatusHistoryDialog = ({
  orderId,
  orderNumber,
}: {
  orderId: number
  orderNumber: number
}): React.JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const [history, setHistory] = useState<OrderStatusHistoryDialogT>([])
  const [isLoading, setIsLoading] = useState(true)

  const colSpan = 4
  const showData = !isLoading && history.length > 0

  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return

    doAxios(`/orders/${orderId}/status-history`, "get", true)
      .then((res) => {
        handleResData(res, setHistory)
      })
      .finally(() => setIsLoading(false))
  }, [open])

  if (!open) {
    return (
      <MenuItem onClick={() => setOpen(true)}>
        {texts.orders.dataGrid.orderStatusHistoryDialog.menuItem}
      </MenuItem>
    )
  } else {
    return (
      <Dialog
        open={open}
        onClose={close}
      >
        <DialogTitle>
          {texts.orders.dataGrid.orderStatusHistoryDialog.title}
          {orderNumber}
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {
                      texts.orders.dataGrid.orderStatusHistoryDialog.table
                        .headers.order_number
                    }
                  </TableCell>

                  <TableCell>
                    {
                      texts.orders.dataGrid.orderStatusHistoryDialog.table
                        .headers.current_status
                    }
                  </TableCell>

                  <TableCell>
                    {
                      texts.orders.dataGrid.orderStatusHistoryDialog.table
                        .headers.user
                    }
                  </TableCell>

                  <TableCell>
                    {
                      texts.orders.dataGrid.orderStatusHistoryDialog.table
                        .headers.created_at
                    }
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell
                      colSpan={colSpan}
                      className="text-center"
                    >
                      <SpinLoader />
                    </TableCell>
                  </TableRow>
                )}
                {!showData && (
                  <TableRow>
                    <TableCell
                      colSpan={colSpan}
                      className="text-center"
                    >
                      {
                        texts.orders.dataGrid.orderStatusHistoryDialog.table
                          .rows.noHistoryFound
                      }
                    </TableCell>
                  </TableRow>
                )}
                {showData &&
                  history.map(({ order, status, user, created_at }, idx) => (
                    <TableRow
                      key={order.order_number.toString() + idx.toString()}
                    >
                      <TableCell>#{order.order_number}</TableCell>
                      <TableCell sx={{ color: `${status.color}` }}>
                        {status.value}
                      </TableCell>
                      <TableCell>
                        <Avatars
                          users={[user]}
                          maxAvatars={1}
                          className={{ group: "justify-center" }}
                        />
                      </TableCell>
                      <TableCell>{formatDate(created_at)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            text={texts.orders.dataGrid.orderStatusHistoryDialog.closeButton}
            handleClick={close}
          />
        </DialogActions>
      </Dialog>
    )
  }
}
export default OrderStatusHistoryDialog
