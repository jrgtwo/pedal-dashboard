import { useEffect } from 'react'

import type { PedalShape } from '../Pedal/Pedal.types'

import { usePedalStore } from './store/pedal'
import { Pedal } from '../Pedal/Pedal'
import { useDraggable } from './hooks/useDraggable'
import testboard from '../../../../../../assets/test-board.png'

const Sandbox = () => {
  const pedals = usePedalStore((state) => state.pedals)
  const updateHistory = usePedalStore((state) => state.updateHistory)

  const {
    setter,
    draggableArray,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove
  } = useDraggable<PedalShape>(pedals)

  useEffect(() => {
    setter(pedals)
    updateHistory(pedals)
  }, [pedals, setter, updateHistory])

  return (
    <section
      role="sandbox"
      className="relative pedal-dashboard-grid w-full h-[50vh]"
      onMouseDown={(event) => handleMouseDown(event)}
      onMouseUp={(event) => handleMouseUp(event)}
      onMouseMove={(event) => handleMouseMove(event)}>
      <img src={testboard} alt="testboard" />
      {draggableArray.map((pedal) => (
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
