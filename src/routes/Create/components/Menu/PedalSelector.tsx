import { type MouseEventHandler, useMemo, useState } from "react"
import { Tables } from "database.types"

import { SidebarProvider } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

type PedalSelectorProps = {
  pedalList: Tables<'pedals'>[] | null | undefined,
  savePedalDataById: MouseEventHandler<HTMLButtonElement>,
  deletePedalDataById?: MouseEventHandler<HTMLButtonElement>,
  isSuccess: boolean,
  myPedalIdList?: number[],
  className?: string
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

const PedalSelector = ({
  pedalList,
  savePedalDataById,
  deletePedalDataById,
  isSuccess,
  myPedalIdList,
  className = ''
}: PedalSelectorProps) => {
  const [sortDirection, setSortDirection] = useState<SORT_DIRECTION>(SORT_DIRECTION.ASC)
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.ALL)
  const [filterSecondary, setFilterSecondary] = useState<string>('')

  const filterList = useMemo(() => {
    const filterSet = new Set<string>()

    pedalList?.forEach((item) => {
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
      <DialogTrigger className={`${className}`}>
        Pedal Selector
      </DialogTrigger>
      <DialogContent className="flex h-9/12 max-h-9/12 max-w-9/12 w-9/12 sm:max-w-9/12 sm:w-9/12 overflow-hidden">
        <SidebarProvider>
          <DialogTitle className="hidden">Pedal Selector</DialogTitle>
          <DialogDescription className="hidden">
            Select a pedal to add to your gear.
          </DialogDescription>
          <Sidebar variant="sidebar">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Sort</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        variant='outline'
                        onClick={handleSortClick(SORT_DIRECTION.ASC)}>A-Z</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        variant='outline'
                        onClick={handleSortClick(SORT_DIRECTION.DESC)}>Z-A</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>

              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Filter</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        key={'all'}
                        variant='outline'
                        onClick={handleFilterClick(FILTER_TYPE.ALL, FILTER_TYPE.ALL)}>All</SidebarMenuButton>
                    </SidebarMenuItem>
                    {
                      filterList?.map((item) => {
                        return (
                          <SidebarMenuItem key={item}>
                            <SidebarMenuButton
                              variant='outline'
                              onClick={handleFilterClick(FILTER_TYPE.TYPE, item)}>{item}</SidebarMenuButton>
                          </SidebarMenuItem>
                        )
                      })
                    }
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
          </Sidebar>

          <main className="overflow-scroll w-full">
            <h2>Select a Pedal</h2>
            <section className="flex flex-wrap mt-4">
              {filteredPedalList && filteredPedalList.map((item) => {
                const isOwned = myPedalIdList?.includes(item.id)
                return (
                  <div
                    className="w-[200px] h-[200px] relative group p-4 hover:bg-gray-200 rounded-2xl gap-8"
                    key={`${item.name}:${item.id}`}>

                    <div className="hidden absolute top-0 left-0 w-full h-full bg-black/50 rounded-2xl group-hover:flex items-center justify-center gap-4">
                      {!isOwned && (
                        <Button
                          variant="outline"
                          size="xl"
                          data-pedal-id={`${item.id}`}
                          key={`${item.name}:${item.id}`}
                          className="max-w-full"
                          onClick={savePedalDataById}>Add Pedal</Button>
                      )}
                      {isOwned && (
                        <Button
                          variant="destructive"
                          size="xl"
                          data-pedal-id={`${item.id}`}
                          onClick={deletePedalDataById}
                          className="max-w-full"
                        >Remove Pedal</Button>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="overflow-hidden line-clamp-1 text-center">
                        {item.name}
                      </p>
                      <img
                        className="max-h-[125px] w-auto object-contain"
                        src={`/src/assets/${item.img}`} />
                    </div>
                  </div>
                )
              })}
            </section>
          </main>
        </SidebarProvider>

      </DialogContent>
    </Dialog >
  )
}

export { PedalSelector }
