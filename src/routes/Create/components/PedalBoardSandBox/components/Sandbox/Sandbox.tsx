import { useEffect, useCallback } from 'react'

import type { PedalShape } from '../Pedal/Pedal.types'

import { usePedalStore } from './store/pedal'
import { Pedal } from '../Pedal/Pedal'
import { useDraggable } from './hooks/useDraggable'
import testboard from '../../../../../../assets/test-board.png'

const Sandbox = () => {
  const pedals = usePedalStore((state) => state.pedals)
  const updateHistory = usePedalStore((state) => state.updateHistory)
  const removeBy = usePedalStore((state) => state.removeBy)

  const {
    setter,
    onDraggingComplete,
    draggableArray,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  } = useDraggable<PedalShape>(pedals)

  useEffect(() => {
    setter(pedals)
  }, [pedals, setter])


  useEffect(() => {
    let ignore = false
    onDraggingComplete((updatedDraggableArray, target) => {
      if (target?.classList.contains('remove')) return
      if (ignore) return
      updateHistory(updatedDraggableArray)
    })

    return () => { ignore = true }
  }, [onDraggingComplete, updateHistory])

  const handleRemove = useCallback((key: keyof PedalShape, value: string) => {
    removeBy(key, value)
  }, [removeBy])

  return (
    <section
      role="sandbox"
      className="relative pedal-dashboard-grid w-full h-[50vh]"
      onMouseDown={(event) => handleMouseDown(event)}
      onMouseUp={(event) => handleMouseUp(event)}
      onMouseMove={(event) => handleMouseMove(event)}>
      <img src={testboard} alt="testboard" />
      {draggableArray.map((pedal,) => (
        <Pedal
          handleRemove={handleRemove}
          pedalId={`${pedal.dragId}`}
          name={pedal.name}
          key={pedal.dragId}
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
