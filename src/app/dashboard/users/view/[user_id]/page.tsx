import React from "react"
import UserForm from "@/components/dashboard/users/form/UserForm"

const UsersViewPage = ({ params }: { params: { user_id: number } }) => {
  const userId = params.user_id

  return (
    <UserForm
      id={userId}
      readonly={true}
    />
  )
}
export default UsersViewPage
