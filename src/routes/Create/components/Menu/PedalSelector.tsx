import { type MouseEventHandler, useMemo, useState } from "react"
import { Tables } from "database.types"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type PedalSelectorProps = {
  pedalList: Tables<'pedals'>[],
  savePedalDataById: MouseEventHandler<HTMLButtonElement>,
  isSuccess: boolean
}

enum SORT_DIRECTION {
  ASC,
  DESC,
}
enum FILTER_TYPE {
  ALL = 'all',
  BRAND = 'mfg',
  TYPE = 'type'
}

const PedalSelector = ({ pedalList, savePedalDataById, isSuccess }: PedalSelectorProps) => {
  const [sortDirection, setSortDirection] = useState<SORT_DIRECTION>(SORT_DIRECTION.ASC)
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.ALL)
  const [filterSecondary, setFilterSecondary] = useState<string>()


  const filterList = useMemo(() => {
    const filterSet = new Set()
    pedalList.forEach((item) => {
      [...(item?.type) || []].forEach((type) => {
        filterSet.add(type)
      })

    })
    return [...filterSet].sort()
  }, [pedalList])

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

  return (

    <Dialog>
      <DialogTrigger>Pedals</DialogTrigger>
      <DialogContent className=" max-h-9/12 max-w-9/12 w-9/12 sm:max-w-9/12 sm:w-9/12 overflow-hidden">
        <section className="flex">
          <SidebarProvider>
            <DialogTitle>Pedal Selector</DialogTitle>
            <Sidebar variant="sidebar">
              <SidebarHeader />
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Sort</SidebarGroupLabel>
                  <Button onClick={handleSortClick(SORT_DIRECTION.ASC)}>A-Z</Button>
                  <Button onClick={handleSortClick(SORT_DIRECTION.DESC)}>Z-A</Button>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Filter</SidebarGroupLabel>
                  <Button onClick={handleFilterClick(FILTER_TYPE.ALL, FILTER_TYPE.ALL)}>All</Button>
                  {
                    filterList?.map((item) => {
                      return (
                        <Button onClick={handleFilterClick(FILTER_TYPE.TYPE, item)}>{item}</Button>
                      )
                    })
                  }
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter />
            </Sidebar>
            <main>
              <SidebarTrigger />
              <h2>Select a Pedal</h2>
              <ScrollArea >
                {filteredPedalList && filteredPedalList.map((item) => (
                  <Button
                    variant="link"
                    className="block"
                    data-pedal-id={`${item.id}`}
                    key={`${item.name}:${item.id}`}
                    onClick={savePedalDataById}>{item.name}</Button>
                ))}
              </ScrollArea>
            </main>
          </SidebarProvider>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export { PedalSelector }
