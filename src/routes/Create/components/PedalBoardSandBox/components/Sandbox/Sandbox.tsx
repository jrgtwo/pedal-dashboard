import { Pedal } from '../Pedal/Pedal'
import testboard from '../../../../../../assets/test-board.png'
import { useSandbox } from './hooks/useSandbox'
import { Button } from '@/components/ui/button'
import { useZoom } from './hooks/useZoom'

const Sandbox = () => {
  const {
    draggableArray,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleRemove
  } = useSandbox()

  const { onZoomIn, onZoomOut, onResetZoom, zoomLevel } = useZoom()

  return (
    <>
      <div className="flex flex-row items-center gap-2 mb-4">

        <Button onClick={onZoomIn}>+</Button>
        <Button onClick={onZoomOut}>-</Button>
        <Button onClick={onResetZoom}>Reset</Button>
        <span>Zoom Level: {zoomLevel}x </span>
      </div>
      <section
        role="sandbox"
        id="pedal-dashboard-sandbox"
        className={`relative  w-[1088px] h-[600px] overflow-scroll`}

        onMouseDown={(event) => handleMouseDown(event)}
        onMouseUp={(event) => handleMouseUp(event)}
        onMouseMove={(event) => handleMouseMove(event)}>
        <div
          className="pedal-dashboard-grid"
          style={{ zoom: `${zoomLevel}` }}
        >
          <img
            src={testboard}
            alt="testboard"
            width={24 * 30}
            height={14.5 * 30}
            className="max-w-none" />
          {draggableArray.map((pedal) => (
            <Pedal
              handleRemove={handleRemove}
              pedalId={`${pedal.dragId}`}
              name={pedal.name}
              key={pedal.dragId}
              img={pedal.img}
              w={pedal.w}
              h={pedal.h}
              x={pedal.x}
              y={pedal.y} />
          ))}
        </div>
      </section >
    </>
  )
}

export { Sandbox }
