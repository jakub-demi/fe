import React from "react"
import OrderCategoryForm from "@/components/dashboard/order-categories/form/OrderCategoryForm"

const OrderCategoriesEditPage = ({
  params,
}: {
  params: { order_category_id: number }
}) => {
  return <OrderCategoryForm id={params.order_category_id} />
}
export default OrderCategoriesEditPage
