import { useCallback } from 'react'
import { usePedalStore } from '../PedalBoardSandBox/components/Sandbox/store/pedal'
import { buttonVariants } from "@/components/ui/button"
import { PedalSelector } from './PedalSelector'
import { useGetAllPedals } from '@/queryHooks/pedalBoard/useGetAllPedals'

const Menu = () => {
  const { isSuccess, isLoading, pedalList } = useGetAllPedals()

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

    return addNewPedal({ ...pedalById, dragId: Date.now() })
  }, [pedalList, addNewPedal])

  return (
    <section>
      {isLoading && <h2>...loading Pedals</h2>}
      <PedalSelector
        className={`m-0 w-fit ${buttonVariants({ variant: "outline" })}`}
        savePedalDataById={savePedalDataById}
      />
    </section>
  )
}

export { Menu }
