import React from "react"
import OrderCategoryForm from "@/components/dashboard/order-categories/form/OrderCategoryForm"

const OrderCategoriesViewPage = ({
  params,
}: {
  params: { order_category_id: number }
}) => {
  return (
    <OrderCategoryForm
      id={params.order_category_id}
      readonly={true}
    />
  )
}
export default OrderCategoriesViewPage
