"use client"

import React from "react"
import { useRouter } from "next/navigation"

const AdminSectionPage = () => {
  const router = useRouter()

  router.back()

  return null
}
export default AdminSectionPage
