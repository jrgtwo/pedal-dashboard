import { useState, useCallback, useEffect, type MouseEvent } from 'react'

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
  acc.set(item.id, { ...item })
  return acc
}, new Map())

const triggerOnComplete = <T,>(data: T[], listeners: ((data: T[]) => void)[]) => {
  listeners.forEach((listener) => {
    listener(data)
  })
}

const useDraggable = <T extends RequiredDataValues,>(data: T[]) => {

  // TODO: Add error handling
  const [draggableMap, setDraggableMap] = useState(dataToMap<T>([...data]))
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

  const [draggableArray, setDraggableArray] = useState<T[]>([])

  const [onCompleteListeners, setOnCompleteListeners] = useState<((data: T[]) => void)[]>([])

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

    triggerOnComplete(draggableArray, onCompleteListeners)

  }, [onCompleteListeners, draggableArray])

  const handleMouseMove = useCallback((event: MouseEvent) => {

    if (isDragging && !!currDraggable) {

      const xPos = (keepInBounds(event.clientX - sandboxLeft - currDraggableXOffset, sandboxWidth - currDraggableWidth))
      const yPos = (keepInBounds(event.clientY - sandboxTop - currDraggableYOffset, sandboxHeight - currDraggableHeight))
      const newCurrDraggable = { ...currDraggable }
      /// We found the culprit...nested array was still linked
      newCurrDraggable.location = { ...newCurrDraggable.location }
      newCurrDraggable.location.x = xPos
      newCurrDraggable.location.y = yPos

      setDraggableMap((prevDraggableMap) => {

        return new Map(prevDraggableMap.set(currDraggable.id, newCurrDraggable))
      })
    }
  }, [isDragging, currDraggable,
    sandboxTop, sandboxLeft, sandboxWidth, sandboxHeight,
    currDraggableWidth, currDraggableHeight, currDraggableXOffset, currDraggableYOffset,
    setDraggableMap
  ])

  useEffect(() => {
    setDraggableArray([...draggableMap.values()])
  }, [draggableMap])

  const setter = useCallback((updatedData: T[]) => {
    setDraggableMap(dataToMap(updatedData))
  }, [])

  const onDraggingComplete = (callback: (data: T[]) => void) => {
    setOnCompleteListeners((prev) => [...prev, callback])
  }

  return { handleMouseDown, handleMouseUp, handleMouseMove, draggableArray, setter, isDragging, onDraggingComplete, onCompleteListeners }
}

export { useDraggable }
