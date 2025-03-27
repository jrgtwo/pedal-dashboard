import { useState, useCallback, type MouseEvent } from 'react'
import { PedalShape } from '../../Pedal/Pedal.types'

type RequiredDataValues = {
  id: number
}
const keepInBounds = (value: number, max: number) => {
  return Math.min(Math.max(value, 0), max)
}

const useDraggable = <T extends RequiredDataValues,>(data: T[]) => {

  const mockPedalMap = data.reduce((acc, item) => {
    acc.set(item.id, item)
    return acc
  }, new Map())

  const [pedalMap, setPedalMap] = useState(mockPedalMap)
  const [currPedal, setCurrPedal] = useState<PedalShape | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [sandboxTop, setSandboxTop] = useState(0)
  const [sandboxLeft, setSandboxLeft] = useState(0)
  const [sandboxWidth, setSandboxWidth] = useState(0)
  const [sandboxHeight, setSandboxHeight] = useState(0)
  const [currPedalWidth, setCurrPedalWidth] = useState(0)
  const [currPedalHeight, setCurrPedalHeight] = useState(0)
  const [currPedalXOffset, setCurrPedalXOffset] = useState(0)
  const [currPedalYOffset, setCurrPedalYOffset] = useState(0)

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

      const pedalId = draggableElement.getAttribute('data-pedal-id')
      const pedal = pedalMap.get(Number(pedalId))

      if (!pedal) {
        setIsDragging(false)
        setCurrPedal(null)
        return
      }

      setCurrPedal(pedal)
      setSandboxTop(event.currentTarget.offsetTop)
      setSandboxLeft(event.currentTarget.offsetLeft)
      setSandboxWidth(event.currentTarget.clientWidth)
      setSandboxHeight(event.currentTarget.clientHeight)
      setCurrPedalHeight(draggableElement.clientHeight)
      setCurrPedalWidth(draggableElement.clientWidth)
      setCurrPedalXOffset(event.clientX - event.currentTarget.offsetLeft - draggableElement.offsetLeft)
      setCurrPedalYOffset(event.clientY - event.currentTarget.offsetTop - draggableElement.offsetTop)

      setIsDragging(true)
    }
  }, [pedalMap]);

  const handleMouseUp = useCallback((event: MouseEvent) => {
    event.preventDefault()
    setIsDragging(false)
    setCurrPedal(null)
  }, [])

  const handleMouseMove = useCallback((event: MouseEvent) => {

    if (isDragging && !!currPedal) {

      const xPos = (keepInBounds(event.clientX - sandboxLeft - currPedalXOffset, sandboxWidth - currPedalWidth))
      const yPos = (keepInBounds(event.clientY - sandboxTop - currPedalYOffset, sandboxHeight - currPedalHeight))
      currPedal.location.x = xPos
      currPedal.location.y = yPos
      setPedalMap((prevPedalMap) => {
        return new Map(prevPedalMap.set(currPedal.id, currPedal))
      })
    }
  }, [isDragging, currPedal,
    sandboxTop, sandboxLeft, sandboxWidth, sandboxHeight,
    currPedalWidth, currPedalHeight, currPedalXOffset, currPedalYOffset,
    setPedalMap
  ])

  return { handleMouseDown, handleMouseUp, handleMouseMove, pedalMap }
}

export { useDraggable }