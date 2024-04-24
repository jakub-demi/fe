import React from "react"
import OrderForm from "@/components/dashboard/orders/form/OrderForm"

const OrdersEditPage = ({ params }: { params: { order_id: number } }) => {
  const orderId = params.order_id

  return <OrderForm id={orderId} />
}
export default OrdersEditPage
