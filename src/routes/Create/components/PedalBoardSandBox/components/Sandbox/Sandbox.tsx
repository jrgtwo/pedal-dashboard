import type { PedalShape } from '../Pedal/Pedal.types'

import { Pedal } from '../Pedal/Pedal'
import { useDraggable } from './hooks/useDraggable'
import testboard from '../../../../../../assets/test-board.png'

const mockPedalJSON = [{
  id: 1,
  name: 'test pedal',
  brand: 'JRGarcia Amps',
  location: {
    w: 100,
    h: 100,
    x: 0,
    y: 0
  }
}, {
  id: 2,
  name: 'test pedal 2',
  brand: 'JRGarcia Amps',
  location: {
    w: 200,
    h: 100,
    x: 200,
    y: 200
  }
}, {
  id: 3,
  name: 'bmp',
  brand: '-',
  img: 'bmp.png',
  location: {
    w: 192,
    h: 253,
    x: 450,
    y: 200
  }
}]

const Sandbox = () => {
  const {
    pedalMap,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove
  } = useDraggable<PedalShape>(mockPedalJSON)

  return (
    <section
      role="sandbox"
      className="relative pedal-dashboard-grid w-full h-[50vh]"
      onMouseDown={(event) => handleMouseDown(event)}
      onMouseUp={(event) => handleMouseUp(event)}
      onMouseMove={(event) => handleMouseMove(event)}>

      <img src={testboard} alt="testboard" />

      {[...pedalMap.values()].map((pedal) => (
        <Pedal
          pedalId={pedal.id}
          name={pedal.name}
          key={pedal.id}
          img={pedal.img}
          w={pedal.location.w}
          h={pedal.location.h}
          x={pedal.location.x}
          y={pedal.location.y} />
      ))}

    </section >
  )
}

export { Sandbox }