import { useEffect, useCallback } from 'react'
import { useParams } from 'react-router'
import type { DraggablePedalShape } from '../Pedal/Pedal.types'
import { API } from '../../../../../../api/api'
import { usePedalStore } from './store/pedal'
import { Pedal } from '../Pedal/Pedal'
import { useDraggable } from './hooks/useDraggable'
import testboard from '../../../../../../assets/test-board.png'

const Sandbox = () => {
  const pedals = usePedalStore((state) => state.pedals)
  const updateHistory = usePedalStore((state) => state.updateHistory)
  const removeBy = usePedalStore((state) => state.removeBy)
  const { boardId } = useParams()

  const updateFromFetch = usePedalStore((state) => state.updateFromFetch)

  useEffect(() => {
    if (!boardId) return

    (async () => {
      const { data, error } = await API.pedalBoard.getBoardById(parseInt(boardId, 10))

      if (error || !data) {
        console.log(error)
        return
      }

      updateFromFetch({ id: data[0].id, pedals: data[0].board, name: data[0].name })
    })()
  }, [boardId, updateFromFetch])

  const {
    setter,
    onDraggingComplete,
    draggableArray,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  } = useDraggable<DraggablePedalShape>(pedals)

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

  const handleRemove = useCallback((key: keyof DraggablePedalShape, value: string) => {
    removeBy(key, value)
  }, [removeBy])

  return (
    <section
      role="sandbox"
      className="relative pedal-dashboard-grid w-full h-[50vh]"
      onMouseDown={(event) => handleMouseDown(event)}
      onMouseUp={(event) => handleMouseUp(event)}
      onMouseMove={(event) => handleMouseMove(event)}>
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
          w={pedal.location.w}
          h={pedal.location.h}
          x={pedal.location.x}
          y={pedal.location.y} />
      ))}
    </section >
  )
}

export { Sandbox }
