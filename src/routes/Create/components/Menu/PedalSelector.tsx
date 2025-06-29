import { type MouseEventHandler, useMemo, useState } from "react"
import { Tables } from "database.types"

import { createFilterList } from "./utils"
import { PedalSelectorComponent } from "./PedalSelectorComponent"
import { useGetAllPedals } from "@/queryHooks/pedalBoard/useGetAllPedals"

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
  // pedalList,
  savePedalDataById,
  deletePedalDataById,
  // isSuccess,
  myPedalIdList,
  className = ''
}: PedalSelectorProps) => {
  const { isSuccess, isLoading, pedalList } = useGetAllPedals()
  const [sortDirection, setSortDirection] = useState<SORT_DIRECTION>(SORT_DIRECTION.ASC)
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.ALL)
  const [filterSecondary, setFilterSecondary] = useState<string>('')

  const filterList = useMemo(() => createFilterList(pedalList), [pedalList])

  const filteredPedalList = useMemo(() => {
    if (isSuccess && pedalList) {
      const filteredList = filterType === FILTER_TYPE.ALL
        ? pedalList
        : pedalList.filter((pedal) => pedal[filterType].includes(filterSecondary))

      const sortedList = filteredList.sort(({ name }, { name: nameB }) => {
        const AName = name.toUpperCase();
        const BName = nameB.toUpperCase();
        if (AName < BName) return sortDirection === SORT_DIRECTION.ASC ? -1 : 1
        if (AName > BName) return sortDirection === SORT_DIRECTION.ASC ? 1 : -1
        return 0;
      })

      return sortedList
    } else {
      return []
    }
  }, [pedalList, isSuccess, sortDirection, filterType, filterSecondary])

  const handleFilterClick = (type: FILTER_TYPE, secondary: string) => () => {
    setFilterType(type)
    setFilterSecondary(secondary)
  }

  const handleSortClick = (direction: SORT_DIRECTION) => () => {
    setSortDirection(direction)
  }
  return <PedalSelectorComponent
    pedalList={filteredPedalList}
    savePedalDataById={savePedalDataById}
    deletePedalDataById={deletePedalDataById}
    myPedalIdList={myPedalIdList}
    className={className}
    filterList={filterList}
    handleFilterClick={handleFilterClick}
    handleSortClick={handleSortClick}
  />
}

export { PedalSelector }
