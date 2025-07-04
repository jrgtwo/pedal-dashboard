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
          {draggableArray.map((pedal) => {
            if (pedal.dragId === 'testboard') {
              return (
                <img
                  className="draggable max-w-none hover:cursor-grab active:cursor-grabbing active:outline-4 active:outline-red-500 drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                  style={{ position: 'absolute', top: pedal.y, left: pedal.x }}
                  key="testboard"
                  src={testboard}
                  alt="testboard"
                  width={24 * 30}
                  height={14.5 * 30}
                  data-draggable-id="testboard"
                />
              )
            }
            return (
              <Pedal
                handleRemove={handleRemove}
                pedalId={`${pedal.dragId}`}
                name={pedal.name}
                key={pedal.dragId}
                img={pedal.img}
                rotation={pedal.rotation}
                w={pedal.w}
                h={pedal.h}
                x={pedal.x}
                y={pedal.y} />
            )
          })}
        </div>
      </section >
    </>
  )
}

export { Sandbox }
