import * as React from "react"
import Button from "@/components/_common/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useEffect, useState } from "react"
import texts from "@/texts"
import doAxios from "@/utils/doAxios"
import { UserT } from "@/types"
import { handleResData } from "@/utils"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"

//todo:dev
const OrderStatusHistoryDialog = ({
  orderId,
}: {
  orderId: number
}): React.JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const [history, setHistory] = useState<
    {
      order_number: number
      status: string
      changed_by_user: UserT
      created_at: Date
    }[]
  >([])

  const close = () => setOpen(false)

  useEffect(() => {
    doAxios(`/orders/${orderId}/status-history`, "get", true).then((res) => {
      handleResData(res, setHistory)
    })
  }, [])

  useEffect(() => {
    setOpen(true)
  }, [history])

  return (
    <Dialog
      open={open}
      onClose={close}
    >
      <DialogTitle>dialogTitle</DialogTitle>
      <DialogContent>
        {/*<DialogContentText>*/}
        {/*  dialogContentText*/}
        {/*</DialogContentText>*/}

        <TableContainer>
          <Table>
            <TableHead>{/* todo:dev */}</TableHead>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button
          text="closeButtonText"
          handleClick={close}
        />
      </DialogActions>
    </Dialog>
  )
}
export default OrderStatusHistoryDialog
