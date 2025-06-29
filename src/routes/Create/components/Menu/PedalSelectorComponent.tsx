import { Tables } from "database.types"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarWrapper } from "./PedalSelector/SidebarWrapper"

import { SORT_DIRECTION, FILTER_TYPE } from "./PedalSelector"
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
import { PedalList } from "./PedalSelector/PedalList"

type PedalSelectorComponentProps = {
  pedalList: Tables<'pedals'>[] | null | undefined,
  savePedalDataById: (event: React.MouseEvent<HTMLButtonElement>) => void,
  deletePedalDataById?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  myPedalIdList?: number[],
  filterList: string[],
  handleSortClick: (direction: SORT_DIRECTION) => (event: React.MouseEvent<HTMLButtonElement>) => void,
  handleFilterClick: (type: FILTER_TYPE, secondary: string) => (event: React.MouseEvent<HTMLButtonElement>) => void,
  className?: string
}

const PedalSelectorComponent = ({
  pedalList,
  savePedalDataById,
  deletePedalDataById,
  myPedalIdList,
  filterList,
  handleSortClick,
  handleFilterClick,
  className = ''
}: PedalSelectorComponentProps) => {

  return (

    <Dialog>
      <DialogTrigger className={`${className}`}>
        Pedal Selector
      </DialogTrigger>
      <DialogContent className="flex h-9/12 max-h-9/12 max-w-9/12 w-9/12 sm:max-w-9/12 sm:w-9/12 overflow-hidden">
        <DialogTitle className="hidden">Pedal Selecsdtor</DialogTitle>
        <DialogDescription className="hidden">
          Select a pedal to add to your gear.
        </DialogDescription>

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
      </DialogContent>
    </Dialog >
  )
}

export { PedalSelectorComponent }
