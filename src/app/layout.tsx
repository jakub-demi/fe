"use client"

// import type { Metadata } from "next"
import "@/styles/globals.css"
import React from "react"
import AuthMiddleware from "@/components/_common/AuthMiddleware"

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body>
        <AuthMiddleware>{children}</AuthMiddleware>
      </body>
    </html>
  )
}
export default RootLayout
