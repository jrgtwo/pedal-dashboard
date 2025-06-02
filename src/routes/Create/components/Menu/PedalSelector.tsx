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
  SidebarHeader,
  SidebarInset
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
      <DialogTrigger className={`my-6 ${className}`}>
        Pedal Selector
      </DialogTrigger>
      <DialogContent className="flex h-9/12 max-h-9/12 max-w-9/12 w-9/12 sm:max-w-9/12 sm:w-9/12 overflow-hidden">
        <SidebarProvider>
          {/* <DialogTitle>Pedal Selector</DialogTitle> */}
          <Sidebar variant="floating">
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
                        variant='outline'
                        onClick={handleFilterClick(FILTER_TYPE.ALL, FILTER_TYPE.ALL)}>All</SidebarMenuButton>
                    </SidebarMenuItem>
                    {
                      filterList?.map((item) => {
                        return (
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              key={item}
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
          <main className="overflow-scroll">
            <h2>Select a Pedal</h2>
            {filteredPedalList && filteredPedalList.map((item) => {
              return (
                <div
                  className=" w-full h-auto flex flex-col justify-start p-4 border-2"
                  key={`${item.name}:${item.id}`}>
                  <img
                    className="w-20"
                    src={`/src/assets/${item.img}`} />
                  <p>{item.name}</p>
                  <Button
                    variant={`${myPedalIdList?.includes(item.id) ? 'highlight' : 'outline'}`}
                    data-pedal-id={`${item.id}`}
                    key={`${item.name}:${item.id}`}
                    onClick={savePedalDataById}>Add</Button>

                  <Button
                    variant="destructive"
                    data-pedal-id={`${item.id}`}
                    onClick={deletePedalDataById}
                  >Delete </Button>
                </div>
              )
            })}
          </main>
        </SidebarProvider>

      </DialogContent>
    </Dialog >
  )
}

export { PedalSelector }
