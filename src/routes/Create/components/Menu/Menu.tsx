import { useCallback } from 'react'
import { usePedalStore } from '../PedalBoardSandBox/components/Sandbox/store/pedal'
import { buttonVariants } from "@/components/ui/button"
import { GearSelector } from './GearSelector'
import { useGetAllPedals } from '@/queryHooks/pedalBoard/useGetAllPedals'
import { useGetAllBoards } from '@/queryHooks/pedalBoard/useGetAllBoards'

const Menu = () => {
  const { isLoading, pedalList } = useGetAllPedals()
  const { isBoardsLoading, boardList } = useGetAllBoards()

  const addNewPedal = usePedalStore((state) => state.addNewPedals)

  const savePedalDataById = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const elem = event.target as HTMLElement
    const pedalId = elem && parseInt(elem.getAttribute('data-pedal-id') || '', 10)

    if (!pedalId) return
    const pedalById = pedalList?.find((item) => {
      return item.id === pedalId
    })

    if (!pedalById) return
    return addNewPedal({ ...pedalById, dragId: Date.now(), rotation: 0, x: 0, y: 0 })
  }, [pedalList, addNewPedal])

  const saveBoardDataById = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const elem = event.target as HTMLElement
    const boardId = elem && parseInt(elem.getAttribute('data-pedal-id') || '', 10)

    if (!boardId) return
    const boardById = boardList?.find((item) => {
      return item.id === boardId
    })

    if (!boardById) return
    return addNewPedal({ ...boardById, dragId: Date.now(), rotation: 0, x: 0, y: 0 })
  }, [boardList, addNewPedal])

  return (
    <section>
      {isLoading && <h2>...loading Pedals</h2>}
      <GearSelector
        className={`m-0 w-fit ${buttonVariants({ variant: "outline" })}`}
        savePedalDataById={savePedalDataById}
        saveBoardDataById={saveBoardDataById}
      />
    </section>
  )
}

export { Menu }
