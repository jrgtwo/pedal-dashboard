import { MouseEventHandler, useMemo } from "react"
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type PedalSelectorProps = {
  pedalList: Tables<'pedals'>[],
  savePedalDataById: MouseEventHandler<HTMLButtonElement>,
  isSuccess: boolean
}

const PedalSelector = ({ pedalList, savePedalDataById, isSuccess }: PedalSelectorProps) => {

  const filteredPedalList = useMemo(() => {
    if (isSuccess && pedalList) {
      return pedalList.sort(({ name }, { name: nameB }) => {
        const AName = name.toUpperCase();
        const BName = nameB.toUpperCase();
        if (AName < BName) return -1
        if (AName > BName) return 1
        return 0;
      })
    } else {
      return []
    }

  }, [pedalList, isSuccess])

  return (

    <Dialog>
      <DialogTrigger>Pedals</DialogTrigger>
      <DialogContent className=" max-h-9/12 max-w-9/12 w-9/12 sm:max-w-9/12 sm:w-9/12 overflow-hidden">
        <section className="flex">
          <SidebarProvider>
            <Sidebar variant="sidebar">
              <SidebarHeader />
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Sort</SidebarGroupLabel>
                  <Button>A-Z</Button>
                  <Button>Z-A</Button>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Filter</SidebarGroupLabel>
                  <Button>Fuzz</Button>
                  <Button>Distortion</Button>
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
