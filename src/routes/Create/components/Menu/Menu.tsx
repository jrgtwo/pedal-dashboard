import { useState, useCallback, useEffect, type MouseEvent } from 'react'
import type { PedalShape } from '../PedalBoardSandBox/components/Pedal/Pedal.types'
import { API } from '../../../../api/api'
import { usePedalStore } from '../PedalBoardSandBox/components/Sandbox/store/pedal'

const Menu = () => {

  const [pedalList, setPedalList] = useState<PedalShape[] | null>([])

  useEffect(() => {
    (async () => {
      const { data, error } = await API.pedalBoard.getAllPedals()

      if (error) return

      setPedalList(data)
    })()
  }, [])

  const addNewPedal = usePedalStore((state) => state.addNewPedals)

  const savePedalDataById = useCallback((event: MouseEvent) => {
    event.preventDefault()
    const elem = event.target as HTMLElement
    const pedalId = elem && parseInt(elem.getAttribute('data-pedal-id') || '', 10)

    if (!pedalId) return
    const pedalById = pedalList?.find((item) => {
      return item.id === pedalId
    })

    if (!pedalById) return

    return addNewPedal({ ...pedalById, dragId: Date.now() })

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
            {pedalList && pedalList.map((item) => (
              <li key={`${item.name}:${item.id}`}>
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
