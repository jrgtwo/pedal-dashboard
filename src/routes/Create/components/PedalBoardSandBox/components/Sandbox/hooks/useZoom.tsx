import { useState } from "react"
import { Zoom as ZoomComponent } from "../components/Zoom"

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

  const Zoom = () => {
    return (
      <ZoomComponent
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onResetZoom={onResetZoom}
        zoomLevel={zoomLevel} />
    )
  }

  return { Zoom, onZoomIn, onZoomOut, onResetZoom, zoomLevel }
}

export { useZoom }
