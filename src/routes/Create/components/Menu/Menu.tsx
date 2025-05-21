import { useCallback, type MouseEvent } from 'react'
import { usePedalStore } from '../PedalBoardSandBox/components/Sandbox/store/pedal'
import { useGetAllPedals } from '../../../../queryHooks/pedalBoard/useGetAllPedals'
const Menu = () => {

  const { isLoading, isSuccess, isError, pedalList } = useGetAllPedals()

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
    <>
      {isLoading && (<p>Loading...</p>)}

      {isError && <p>{pedalList?.error}</p>}
      {isSuccess && pedalList && pedalList.length === 0 && <p>No pedals found</p>}
      {isSuccess && pedalList && pedalList.length > 0 && (
        <section
          className="w-1/4">
          <h4
            className="font-black">Options</h4 >
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
      )}
    </>
  )
}

export { Menu }
