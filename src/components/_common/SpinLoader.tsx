import CircularProgress from "@mui/material/CircularProgress"
import React from "react"
import cltm from "@/utils/cltm"

const SpinLoader = ({ className }: { className?: string }) => {
  return (
    <>
      <svg
        width={0}
        height={0}
      >
        <defs>
          <linearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#e01cd5"
            />
            <stop
              offset="100%"
              stopColor="#1CB5E0"
            />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        className={cltm("w-1/3 h-1/3", className !== undefined && className)}
        sx={{ "svg circle": { stroke: "url(#gradient)" } }}
      />
    </>
  )
}
export default SpinLoader
