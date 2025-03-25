import { useState, MouseEvent } from 'react'
import { Pedal } from '../Pedal/Pedal'

const mockPedalJSON = [{
  id: 1,
  name: 'test pedal',
  brand: 'JRGarcia Amps',
  location: {
    w: 100,
    h: 100,
    x: 0,
    y: 0
  }
}, {
  id: 2,
  name: 'test pedal 2',
  brand: 'JRGarcia Amps',
  location: {
    w: 200,
    h: 100,
    x: 200,
    y: 200
  }
}]

const mockPedalMap = mockPedalJSON.reduce((acc, item) => {
  acc.set(item.id, item)
  return acc
}, new Map())

const keepInBounds = (value: number, max: number) => {
  return Math.min(Math.max(value, 0), max)
}
const Sandbox = () => {
  const [pedalMap, setPedalMap] = useState(mockPedalMap)
  // const [x, setX] = useState(0)
  // const [y, setY] = useState(0)
  const [currPedal, setCurrPedal] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [sandboxTop, setSandboxTop] = useState(0)
  const [sandboxLeft, setSandboxLeft] = useState(0)
  const [sandboxWidth, setSandboxWidth] = useState(0)
  const [sandboxHeight, setSandboxHeight] = useState(0)
  const [currPedalWidth, setCurrPedalWidth] = useState(0)
  const [currPedalHeight, setCurrPedalHeight] = useState(0)
  const [currPedalXOffset, setCurrPedalXOffset] = useState(0)
  const [currPedalYOffset, setCurrPedalYOffset] = useState(0)

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault()

    if (
      event.target instanceof HTMLElement
      && event.currentTarget instanceof HTMLElement
      && event.target.classList.contains('draggable')
    ) {
      const pedalId = event.target.getAttribute('data-pedal-id')
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
      setCurrPedalHeight(event.target.clientHeight)
      setCurrPedalWidth(event.target.clientWidth)
      setCurrPedalXOffset(event.clientX - event.currentTarget.offsetLeft - event.target.offsetLeft)
      setCurrPedalYOffset(event.clientY - event.currentTarget.offsetTop - event.target.offsetTop)

      setIsDragging(true)
    }
  }

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault()
    setIsDragging(false)
    setCurrPedal(null)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && !!currPedal) {

      const xPos = (keepInBounds(event.clientX - sandboxLeft - currPedalXOffset, sandboxWidth - currPedalWidth))
      const yPos = (keepInBounds(event.clientY - sandboxTop - currPedalYOffset, sandboxHeight - currPedalHeight))
      currPedal.location.x = xPos
      currPedal.location.y = yPos
      setPedalMap((prevPedalMap) => {
        return new Map(prevPedalMap.set(currPedal.id, currPedal))
      })
    }
  }

  return (
    <section
      role="sandbox"
      className="relative pedal-dashboard-grid w-full h-[50vh]"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>

      { /*<Pedal x={x} y={y} />*/}

      {[...pedalMap.values()].map((pedal) => (
        <Pedal
          pedalId={pedal.id}
          key={pedal.id}
          w={pedal.location.w}
          h={pedal.location.h}
          x={pedal.location.x}
          y={pedal.location.y} />
      ))}

    </section >
  )
}

export { Sandbox }