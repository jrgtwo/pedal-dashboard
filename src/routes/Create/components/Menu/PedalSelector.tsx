import { type MouseEventHandler, useMemo, useState } from "react"
import { Tables } from "database.types"

import { createFilterList, pedalListFilter } from "./utils"
import { PedalSelectorComponent } from "./PedalSelectorComponent"
import { useGetAllPedals } from "@/queryHooks/pedalBoard/useGetAllPedals"
import { SidebarWrapper } from "./PedalSelector/SidebarWrapper"
import { PedalList } from "./PedalSelector/PedalList"

type PedalSelectorProps = {
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

const PedalSelector = ({
  savePedalDataById,
  deletePedalDataById,
  myPedalIdList,
  className = ''
}: PedalSelectorProps) => {
  const { isSuccess, isLoading, pedalList } = useGetAllPedals()

  const [sortDirection, setSortDirection] = useState<SORT_DIRECTION>(SORT_DIRECTION.ASC)
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.ALL)
  const [filterSecondary, setFilterSecondary] = useState<string>('')

  const filterList = useMemo(() => createFilterList(pedalList), [pedalList])

  const filteredPedalList = useMemo(() => {
    if (!isSuccess || !pedalList) return []

    const filteredList = filterType === FILTER_TYPE.ALL
      ? pedalList
      : pedalList.filter((pedal) => pedal[filterType].includes(filterSecondary))

    const sortedList = filteredList.sort(pedalListFilter(sortDirection))

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
    <PedalSelectorComponent
      pedalList={filteredPedalList}
      savePedalDataById={savePedalDataById}
      deletePedalDataById={deletePedalDataById}
      myPedalIdList={myPedalIdList}
      className={className}
      filterList={filterList}
      handleFilterClick={handleFilterClick}
      handleSortClick={handleSortClick}
    >
      <SidebarWrapper
        handleSortClick={handleSortClick}
        handleFilterClick={handleFilterClick}
        filterList={filterList}
      >
        <PedalList
          pedalList={pedalList}
          savePedalDataById={savePedalDataById}
          deletePedalDataById={deletePedalDataById}
          myPedalIdList={myPedalIdList}
        />

      </SidebarWrapper>
    </PedalSelectorComponent>
  )
}

export { PedalSelector }
