import { useState } from "react"

const useZoom = () => {
  const [zoomLevel, setZoomLevel] = useState(1)

  const onZoomIn = () => {
    setZoomLevel((prev) => parseFloat(Math.min(prev + 0.2, 4).toFixed(2)))
  }

  const onZoomOut = () => {
    setZoomLevel((prev) => parseFloat(Math.max(prev - 0.2, 0.1).toFixed(2)))
  }

  const onResetZoom = () => {
    setZoomLevel(1)
  }

  return { onZoomIn, onZoomOut, onResetZoom, zoomLevel }
}

export { useZoom }
