import { Button } from "@/components/ui/button"

type ZoomPropsTypes = {
  onZoomIn: () => void,
  onZoomOut: () => void,
  onResetZoom: () => void,
  zoomLevel: number
}

const Zoom = ({
  onZoomIn,
  onZoomOut,
  onResetZoom,
  zoomLevel
}: ZoomPropsTypes) => {
  return (
    <div className="flex flex-row items-center gap-2 mb-4">
      <Button onClick={onZoomIn}>+</Button>
      <Button onClick={onZoomOut}>-</Button>
      <Button onClick={onResetZoom}>Reset</Button>
      <span>Zoom Level: {zoomLevel}x</span>
    </div>
  )
}

export { Zoom }
