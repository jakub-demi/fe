import React from "react"
import SpinLoader from "@/components/_common/SpinLoader"

const Preloader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SpinLoader large={true} />
    </div>
  )
}
export default Preloader
