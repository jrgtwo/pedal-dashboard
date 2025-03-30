import { useState, useCallback, type MouseEvent } from 'react'

import { usePedalStore } from '../PedalBoardSandBox/components/Sandbox/store/pedal'

const mockPedalList = [{
  id: 1,
  name: 'Big Muff Pi',
  brand: '-',
  img: 'bmp.png',
  location: {
    w: 192,
    h: 253,
    x: 0,
    y: 0
  }
}, {
  id: 2,
  name: 'ProCo Rat',
  brand: '-',
  img: 'rat.png',
  location: {
    w: 263,
    h: 300,
    x: 0,
    y: 0
  }
}]

const Menu = () => {

  const [pedalList] = useState(mockPedalList)
  const addNewPedal = usePedalStore((state) => state.addNewPedals)

  const savePedalDataById = useCallback((event: MouseEvent) => {
    event.preventDefault()
    const elem = event.target as HTMLElement
    const pedalId = elem && parseInt(elem.getAttribute('data-pedal-id') || '', 10)

    if (!pedalId) return
    const pedalById = pedalList.find((item) => {
      return item.id === pedalId
    })

    if (!pedalById) return

    return addNewPedal(pedalById)

  }, [pedalList, addNewPedal])

  return (
    <section
      className="w-1/4">
      <h4
        className="font-black">Options</h4>
      <menu role="menu"
        className="mt-5">
        <li>
          <button>Boards v</button>
        </li>
        <li>
          <button>Pedals v</button>
          <ol>
            {pedalList.map((item) => (
              <li>
                <button
                  data-pedal-id={`${item.id}`}
                  onClick={savePedalDataById}>{item.name}</button>
              </li>
            ))}
          </ol>
        </li>
      </menu >
    </section >
  )
}

export { Menu }
