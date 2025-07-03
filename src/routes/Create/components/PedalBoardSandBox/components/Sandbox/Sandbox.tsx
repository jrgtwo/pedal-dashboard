import { Pedal } from '../Pedal/Pedal'
import testboard from '../../../../../../assets/test-board.png'
import { useSandbox } from './hooks/useSandbox'

const Sandbox = () => {
  const {
    draggableArray,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleRemove
  } = useSandbox()

  return (
    <section
      role="sandbox"
      id="pedal-dashboard-sandbox"
      className="relative  w-full"
      onMouseDown={(event) => handleMouseDown(event)}
      onMouseUp={(event) => handleMouseUp(event)}
      onMouseMove={(event) => handleMouseMove(event)}>
      <div
        className="pedal-dashboard-grid"
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
  )
}

export { Sandbox }
