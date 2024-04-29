import React from "react"
import OrderItemForm from "@/components/dashboard/orders/items/form/OrderItemForm"

const OrderItemsEditPage = ({
  params,
}: {
  params: { order_id: number; order_item_id: number }
}) => {
  return (
    <OrderItemForm
      orderId={params.order_id}
      id={params.order_item_id}
    />
  )
}
export default OrderItemsEditPage
