import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router'
import type { DraggablePedalShape } from '../Pedal/Pedal.types'
import { usePedalStore } from './store/pedal'
import { Pedal } from '../Pedal/Pedal'
import { useDraggable } from './hooks/useDraggable'
import testboard from '../../../../../../assets/test-board.png'
import { useGetBoardById } from '../../../../../../queryHooks/pedalBoard/useGetBoardById'

const Sandbox = () => {
  const [hasSetInitial, setHasSetInitial] = useState(false)
  const pedals = usePedalStore((state) => state.pedals)
  const updateHistory = usePedalStore((state) => state.updateHistory)
  const removeBy = usePedalStore((state) => state.removeBy)
  const { boardId } = useParams()
  const query = useGetBoardById(Number(boardId))
  const updateFromFetch = usePedalStore((state) => state.updateFromFetch)

  useEffect(() => {
    if (query.isSuccess && !hasSetInitial) {

      setHasSetInitial(true)
      updateFromFetch({
        id: query.data?.data?.[0].id,
        pedals: query.data?.data?.[0].board,
        name: query.data?.data?.[0].name
      })
    }
  }, [hasSetInitial, query.isSuccess, query.data, updateFromFetch])


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
