import { useState, useCallback, useEffect, type MouseEvent } from 'react'
import type { PedalShape } from '../PedalBoardSandBox/components/Pedal/Pedal.types'
import { API } from '../../../../api/api'
import { usePedalStore } from '../PedalBoardSandBox/components/Sandbox/store/pedal'


import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

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
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Pedals</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex">
                <div>
                  {pedalList && pedalList.map((item) => (
                    <button
                      className="block"
                      // className="w-[500px]"
                      data-pedal-id={`${item.id}`}
                      key={`${item.name}:${item.id}`}
                      onClick={savePedalDataById}>{item.name}</button>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </section >
  )
}

export { Menu }
