import React from "react"
import OrderItemForm from "@/components/dashboard/orders/items/form/OrderItemForm"

const OrderItemsCreatePage = ({ params }: { params: { order_id: number } }) => {
  return <OrderItemForm orderId={params.order_id} />
}
export default OrderItemsCreatePage
