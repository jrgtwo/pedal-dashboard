import { type MouseEventHandler, useMemo, useState } from "react"
import { Tables } from "database.types"

import { createFilterList, pedalListFilter } from "./utils"
import { GearSelectorComponent } from "./GearSelectorComponent"
import { useGetAllPedals } from "@/queryHooks/pedalBoard/useGetAllPedals"
import { useGetAllBoards } from "@/queryHooks/pedalBoard/useGetAllBoards"
import { SidebarWrapper } from "./GearSelector/SidebarWrapper"
import { GearList } from "./GearSelector/GearList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


type GearSelectorProps = {
  pedalList?: Tables<'pedals'>[] | null | undefined,
  savePedalDataById: MouseEventHandler<HTMLButtonElement>,
  deletePedalDataById?: MouseEventHandler<HTMLButtonElement>,
  myPedalIdList?: number[],
  className?: string
}

export enum SORT_DIRECTION {
  ASC,
  DESC,
}
export enum FILTER_TYPE {
  ALL = 'all',
  BRAND = 'mfg',
  TYPE = 'type'
}

export enum GEAR_TYPE {
  PEDAL = 'pedal',
  BOARD = 'board'
}

const GearSelector = ({
  savePedalDataById,
  saveBoardDataById,
  deletePedalDataById,
  myPedalIdList,
  className = ''
}: GearSelectorProps) => {
  const { isSuccess, pedalList } = useGetAllPedals()
  const { isSuccess: isBoardSuccess, boardList } = useGetAllBoards()

  const [sortDirection, setSortDirection] = useState<SORT_DIRECTION>(SORT_DIRECTION.ASC)
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.ALL)
  const [filterSecondary, setFilterSecondary] = useState<string>('')

  const filterList = useMemo(() => createFilterList(pedalList), [pedalList])

  const filteredGearList = useMemo(() => {
    if (!isSuccess || !pedalList) return []

    const filteredList = filterType === FILTER_TYPE.ALL
      ? pedalList
      : pedalList?.filter((pedal) => {

        return pedal[filterType].includes(filterSecondary)
      })

    const sortedList = filteredList?.sort(pedalListFilter(sortDirection))

    return sortedList

  }, [pedalList, isSuccess, sortDirection, filterType, filterSecondary])

  const handleFilterClick = (type: FILTER_TYPE, secondary: string) => () => {
    setFilterType(type)
    setFilterSecondary(secondary)
  }

  const handleSortClick = (direction: SORT_DIRECTION) => () => {
    setSortDirection(direction)
  }

  return (
    <GearSelectorComponent
      className={className}
    >
      <Tabs defaultValue="pedals">
        <TabsList>
          <TabsTrigger value="pedals">Pedals</TabsTrigger>
          <TabsTrigger value="boards">Boards</TabsTrigger>
        </TabsList>
        <TabsContent value="pedals">
          <SidebarWrapper
            handleSortClick={handleSortClick}
            handleFilterClick={handleFilterClick}
            filterList={filterList}
          >
            <GearList
              isBoards={false}
              gearList={filteredGearList}
              savePedalDataById={savePedalDataById}
              deletePedalDataById={deletePedalDataById}
              myPedalIdList={myPedalIdList}
            />
          </SidebarWrapper>
        </TabsContent>
        <TabsContent value="boards">
          <GearList
            isBoards={true}
            gearList={boardList}
            savePedalDataById={saveBoardDataById}
            deletePedalDataById={deletePedalDataById}
            myPedalIdList={myPedalIdList}
          />
        </TabsContent>
      </Tabs>
    </GearSelectorComponent >
  )
}

export { GearSelector }
