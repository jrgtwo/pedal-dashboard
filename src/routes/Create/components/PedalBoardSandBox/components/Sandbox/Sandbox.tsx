import { Pedal } from '../Pedal/Pedal'
// import testboard from '../../../../../../assets/test-board.png'
import { useSandbox } from './hooks/useSandbox'
import { useZoom } from './hooks/useZoom'

const Sandbox = () => {
  const {
    draggableArray,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleRemove
  } = useSandbox()

  const { Zoom, zoomLevel } = useZoom()

  return (
    <>
      <Zoom />
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
            return (
              <Pedal
                gearType={pedal?.gear_type}
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
