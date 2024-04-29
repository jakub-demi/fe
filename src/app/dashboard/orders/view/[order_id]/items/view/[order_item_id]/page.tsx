import React from "react"
import OrderItemForm from "@/components/dashboard/orders/items/form/OrderItemForm"

const OrderItemsViewPage = ({
  params,
}: {
  params: { order_id: number; order_item_id: number }
}) => {
  return (
    <OrderItemForm
      id={params.order_item_id}
      orderId={params.order_id}
      readonly={true}
    />
  )
}
export default OrderItemsViewPage
