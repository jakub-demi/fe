import React from "react"
import SpinLoader from "@/components/_common/SpinLoader"

const DataGridRender = ({
  dataGridRef,
  isLoading,
  dataGridJsxElement,
}: {
  dataGridRef: React.MutableRefObject<HTMLDivElement | null>
  isLoading: boolean
  dataGridJsxElement: React.JSX.Element
}) => {
  return (
    <div
      ref={dataGridRef}
      className="w-full"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <SpinLoader />
        </div>
      ) : (
        <>{dataGridJsxElement}</>
      )}
    </div>
  )
}
export default DataGridRender
