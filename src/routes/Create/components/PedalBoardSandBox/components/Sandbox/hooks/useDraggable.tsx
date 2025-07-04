import { useState, useCallback, useEffect, type MouseEvent } from 'react'
import { mouseDownRotationHandler, mouseMoveRotationHandler, mouseUpRotationHandler } from './utils/rotationHandlers'
import { mouseDownDragHandler, mouseMoveDragHandler, mouseUpDragHandler } from './utils/dragHandlers'
import { dataToMap } from './utils/data'
import { triggerOnComplete } from './utils/listeners'
import type { RequiredDataValues } from '../Sandbox.types'
import { useDraggableData } from '../state/useDraggableData'

const useDraggable = <T extends RequiredDataValues,>(data: T[] = []) => {
  // Draggable state
  const [lastDragTime, setLastDragTime] = useState<number | null>()
  const [draggableMap, setDraggableMap] = useState(dataToMap<T>([...data || []]))
  const [isDragging, setIsDragging] = useState(false)
  const currDraggableElement = useDraggableData((state) => state.currDraggableElement)
  const setCurrDraggableElement = useDraggableData((state) => state.setCurrDraggableElement)


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
    const currDraggableElement = target.closest('.draggable') || target.parentElement?.closest('.draggable')
    setCurrDraggableElement(currDraggableElement as HTMLElement | null)
    if (!currDraggableElement) {
      setIsDragging(false)
      return
    }
    setIsDragging(true);
    if (target.closest('.rotate') || target?.classList.contains('rotate')) {
      mouseDownRotationHandler({
        event,
        target,
        draggableMap,
        setCurrRotateElement,
        setCurrRotatable,
      })
    } else {

      mouseDownDragHandler({
        event,
        target,
        sandboxElem,
        draggableMap,
        setIsDragging,
      })
    }
  }, [draggableMap, setIsDragging, setCurrRotatable, setCurrRotateElement, setCurrDraggableElement]);

  const handleMouseUp = useCallback((event: MouseEvent) => {
    event.preventDefault()

    triggerOnComplete(draggableArray, currDraggableElement, onCompleteListeners)
    setIsDragging(false)

    mouseUpRotationHandler()
    mouseUpDragHandler()

    setCurrRotateElement(null)
    setCurrDraggableElement(null)
    setLastDragTime(null)
  }, [onCompleteListeners, draggableArray, currDraggableElement, setCurrDraggableElement])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const now = Date.now()

    mouseMoveRotationHandler({
      event, currRotatable, currRotateElement, setDraggableMap,
    })

    if (isDragging && lastDragTime && now - lastDragTime > 9) {
      mouseMoveDragHandler({
        event,
        draggableMap,
        setDraggableMap,
      })
    }
    setLastDragTime(Date.now())
  }, [
    isDragging,
    lastDragTime,
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
