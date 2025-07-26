import { useEffect, useState, useCallback, use } from 'react'
import { useParams } from 'react-router'
import type { DraggablePedalShape } from '../../Pedal/Pedal.types'
import { usePedalStore } from '../store/pedal'
import { useDraggable } from '../hooks/useDraggable'
import { useGetBoardById } from '../../../../../../../queryHooks/pedalBoard/useGetBoardById'

const useSandbox = () => {
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
        pedals: JSON.parse(query.data?.data?.[0].board),
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
    setter([...pedals])
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

  return {
    draggableArray,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleRemove
  }
}

export { useSandbox }
