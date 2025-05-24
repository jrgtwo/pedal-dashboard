import { useCallback, useMemo, type MouseEvent } from 'react'
import { usePedalStore } from '../PedalBoardSandBox/components/Sandbox/store/pedal'

// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

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
    <section
      className="w-1/4">
      <h4
        className="font-black">Options</h4>

      {isLoading && <h2>...loading Pedals</h2>}
      {isSuccess && (
        <PedalSelector
          isSuccess={isSuccess}
          pedalList={pedalList}
          savePedalDataById={savePedalDataById}
        />
      )}

    </section >
  )
}

export { Menu }
