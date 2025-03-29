import { useState, useCallback, type MouseEvent } from 'react'

type RequiredDataValues = {
  id: number,
  location: {
    w: number,
    h: number,
    x: number,
    y: number
  }
}
const keepInBounds = (value: number, max: number) => {
  return Math.min(Math.max(value, 0), max)
}

const dataToMap = <T extends RequiredDataValues,>(_data: T[]) => _data.reduce((acc, item) => {
  acc.set(item.id, item)
  return acc
}, new Map())

const triggerOnComplete = (listeners: (() => void)[]) => {
  listeners.forEach((listener) => {
    listener()
  })
}

const useDraggable = <T extends RequiredDataValues,>(data: T[]) => {

  // TODO: Add error handling
  const [draggableMap, setDraggableMap] = useState(dataToMap<T>(data))
  const [currDraggable, setCurrDraggable] = useState<T | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [sandboxTop, setSandboxTop] = useState(0)

  const [sandboxLeft, setSandboxLeft] = useState(0)
  const [sandboxWidth, setSandboxWidth] = useState(0)
  const [sandboxHeight, setSandboxHeight] = useState(0)

  const [currDraggableWidth, setCurrDraggableWidth] = useState(0)
  const [currDraggableHeight, setCurrDraggableHeight] = useState(0)
  const [currDraggableXOffset, setCurrDraggableXOffset] = useState(0)
  const [currDraggableYOffset, setCurrDraggableYOffset] = useState(0)

  const [oncCompleteListeners, setOnCompleteListeners] = useState<(() => void)[]>([])

  const handleMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault()

    if (
      event.target instanceof HTMLElement
      && event.currentTarget instanceof HTMLElement
      && (
        event.target.classList.contains('draggable')
        || event.target.parentElement?.classList.contains('draggable')
      )
    ) {
      const draggableElement = event.target.classList.contains('draggable')
        ? event.target
        : event.target.parentElement

      if (draggableElement === null) return

      const draggableId = draggableElement.getAttribute('data-draggable-id')
      const draggable = draggableMap.get(Number(draggableId))

      if (!draggable) {
        setIsDragging(false)
        setCurrDraggable(null)
        return
      }

      setCurrDraggable(draggable)
      setSandboxTop(event.currentTarget.offsetTop)
      setSandboxLeft(event.currentTarget.offsetLeft)
      setSandboxWidth(event.currentTarget.clientWidth)
      setSandboxHeight(event.currentTarget.clientHeight)
      setCurrDraggableHeight(draggableElement.clientHeight)
      setCurrDraggableWidth(draggableElement.clientWidth)
      setCurrDraggableXOffset(event.clientX - event.currentTarget.offsetLeft - draggableElement.offsetLeft)
      setCurrDraggableYOffset(event.clientY - event.currentTarget.offsetTop - draggableElement.offsetTop)

      setIsDragging(true)
    }
  }, [draggableMap]);


  const handleMouseUp = useCallback((event: MouseEvent) => {
    event.preventDefault()
    setIsDragging(false)
    setCurrDraggable(null)
    triggerOnComplete(oncCompleteListeners)
  }, [oncCompleteListeners])

  const handleMouseMove = useCallback((event: MouseEvent) => {

    if (isDragging && !!currDraggable) {

      const xPos = (keepInBounds(event.clientX - sandboxLeft - currDraggableXOffset, sandboxWidth - currDraggableWidth))
      const yPos = (keepInBounds(event.clientY - sandboxTop - currDraggableYOffset, sandboxHeight - currDraggableHeight))
      currDraggable.location.x = xPos
      currDraggable.location.y = yPos

      setDraggableMap((prevDraggableMap) => {
        return new Map(prevDraggableMap.set(currDraggable.id, currDraggable))
      })
    }
  }, [isDragging, currDraggable,
    sandboxTop, sandboxLeft, sandboxWidth, sandboxHeight,
    currDraggableWidth, currDraggableHeight, currDraggableXOffset, currDraggableYOffset,
    setDraggableMap
  ])

  const draggableArray = [...draggableMap.values()]

  const setter = useCallback((updatedData: T[]) => {
    setDraggableMap(dataToMap(updatedData))
  }, [])

  const onDraggingComplete = (callback: () => void) => {
    setOnCompleteListeners((prev) => [...prev, callback])
  }


  return { handleMouseDown, handleMouseUp, handleMouseMove, draggableArray, setter, isDragging, onDraggingComplete }
}

export { useDraggable }
