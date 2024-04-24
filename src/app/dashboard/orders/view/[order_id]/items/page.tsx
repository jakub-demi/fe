"use client"

import React, { useEffect } from "react"
import log from "@/utils/log"

const OrderItemsPage = ({ params }: { params: { order_id: number } }) => {
  useEffect(() => {
    log("params", params)
  }, [])

  return <div>OrderItemsPage</div>
}
export default OrderItemsPage
