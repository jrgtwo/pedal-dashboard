import { useState, MouseEvent } from 'react'

const Sandbox = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    if (event.currentTarget.classList.contains('draggable')) {
      setIsDragging(true)
    }
  }

  const handleMouseUp = (event: MouseEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleMouseMove = (event: MouseEvent) => {
    console.log(isDragging)
    if (isDragging) {
      setX(event.clientX)
      setY(event.clientY)
    }
  }
  return (
    <section
      role="sandbox"
      className="pedal-dashboard-grid w-full h-[50vh]"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>
      <div
        id="draggable-box"
        className={`draggable w-[100px] h-[100px] bg-green-400`}
        style={{ position: 'absolute', top: y, left: x }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>{`${x}-${y}`}</div>
    </section >
  )
}

export { Sandbox }