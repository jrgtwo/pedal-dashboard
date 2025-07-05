import { useState, useCallback, useEffect, type MouseEvent } from 'react'
import { mouseDownRotationHandler, mouseMoveRotationHandler, mouseUpRotationHandler } from './utils/rotationHandlers'
import { mouseDownDragHandler, mouseMoveDragHandler } from './utils/dragHandlers'
import { dataToMap } from './utils/data'
import { triggerOnComplete } from './utils/listeners'
import { useRotationData } from '../state/useRotationData'

export type RequiredDataValues = {
  id: number,
  dragId: number,
  w: number,
  h: number,
  x: number,
  y: number,
  rotation: number,
}

const useDraggable = <T extends RequiredDataValues,>(data: T[] = []) => {
  // Draggable state
  const [lastDragTime, setLastDragTime] = useState<number | null>()
  const [draggableMap, setDraggableMap] = useState(dataToMap<T>([...data || []]))
  const [currDraggable, setCurrDraggable] = useState<T | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Position settings
  const [currDraggableElement, setCurrDraggableElement] = useState<HTMLElement | null>(null)

  const [currRotateElement, setCurrRotateElement] = useState<HTMLElement | null>(null)
  const [currRotatable, setCurrRotatable] = useState<T | null>(null)

  // Output data 
  const [draggableArray, setDraggableArray] = useState<T[]>([])
  // Client Listeners
  const [onCompleteListeners, setOnCompleteListeners] = useState<((data: T[], target: HTMLElement | null) => void)[]>([])

  const handleMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault()
    setLastDragTime(Date.now())

    const target = event.target as HTMLElement
    const sandboxElem = event.currentTarget as HTMLElement

    if (target.classList.contains('rotate') || target.parentElement?.classList.contains('rotate')) {
      return mouseDownRotationHandler({
        event,
        target,
        draggableMap,
        setCurrRotateElement,
        setCurrRotatable,
      })
    }

    if (
      target.classList.contains('draggable')
      || target.parentElement?.classList.contains('draggable')
    ) {
      return mouseDownDragHandler({
        event,
        target,
        sandboxElem,
        draggableMap,
        setCurrDraggableElement,
        setCurrDraggable,
        setIsDragging,
      })
    }
  }, [draggableMap, setCurrDraggable, setCurrDraggableElement, setIsDragging, setCurrRotatable, setCurrRotateElement]);

  const handleMouseUp = useCallback((event: MouseEvent) => {
    event.preventDefault()

    triggerOnComplete(draggableArray, currDraggableElement, onCompleteListeners)
    setIsDragging(false)

    mouseUpRotationHandler()
    setCurrRotateElement(null)
    setCurrDraggableElement(null)
    setCurrDraggable(null)
    setLastDragTime(null)
  }, [onCompleteListeners, draggableArray, currDraggableElement])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const now = Date.now()

    mouseMoveRotationHandler({
      event, currRotatable, currRotateElement, setDraggableMap,
    })

    if (isDragging && !!currDraggable && lastDragTime && now - lastDragTime > 9) {
      mouseMoveDragHandler({
        event,
        currDraggable,
        draggableMap,
        setDraggableMap,
      })
    }
    setLastDragTime(Date.now())
  }, [
    isDragging,
    lastDragTime,
    currDraggable,
    currRotatable,
    draggableMap,
    setDraggableMap,
    currRotateElement
  ])

  useEffect(() => {
    setDraggableArray([...draggableMap.values()])
  }, [draggableMap])

  const setter = useCallback((updatedData: T[]) => {
    if (typeof updatedData === 'string') {
      updatedData = JSON.parse(updatedData) as T[]
    }

    setDraggableMap(dataToMap(updatedData))
  }, [])

  const onDraggingComplete = useCallback((callback: (data: T[], target: HTMLElement | null) => void) => {
    setOnCompleteListeners((prev) => [...prev, callback])
  }, [])

  return { handleMouseDown, handleMouseUp, handleMouseMove, draggableArray, setter, isDragging, onDraggingComplete, onCompleteListeners }
}

export { useDraggable }
