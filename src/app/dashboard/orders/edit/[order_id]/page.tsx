import React from "react"

const OrdersEditPage = ({ params }: { params: { order_id: number } }) => {
  const orderId = params.order_id

  return <div>Editing #{orderId} order...</div>
}
export default OrdersEditPage
