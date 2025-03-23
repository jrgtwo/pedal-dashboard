import { useState, MouseEvent } from 'react'
import { Pedal } from '../Pedal/Pedal'

const keepInBounds = (value: number, max: number) => {
  return Math.min(Math.max(value, 0), max)
}
const Sandbox = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [sandboxTop, setSandboxTop] = useState(0)
  const [sandboxLeft, setSandboxLeft] = useState(0)
  const [sandboxWidth, setSandboxWidth] = useState(0)
  const [sandboxHeight, setSandboxHeight] = useState(0)
  const [currPedalWidth, setCurrPedalWidth] = useState(0)
  const [currPedalHeight, setCurrPedalHeight] = useState(0)

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault()

    if (
      event.target instanceof HTMLElement
      && event.target.classList.contains('draggable')
    ) {
      setSandboxTop(event.currentTarget.offsetTop)
      setSandboxLeft(event.currentTarget.offsetLeft)
      setSandboxWidth(event.currentTarget.clientWidth)
      setSandboxHeight(event.currentTarget.clientHeight)
      setCurrPedalHeight(event.target.clientHeight)
      setCurrPedalWidth(event.target.clientWidth)
      setIsDragging(true)
    }
  }

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      setX(keepInBounds(event.clientX - sandboxLeft, sandboxWidth - currPedalWidth))
      setY(keepInBounds(event.clientY - sandboxTop, sandboxHeight - currPedalHeight))
    }
  }

  return (
    <section
      role="sandbox"
      className="relative pedal-dashboard-grid w-full h-[50vh]"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>
      <Pedal x={x} y={y} />
    </section >
  )
}

export { Sandbox }