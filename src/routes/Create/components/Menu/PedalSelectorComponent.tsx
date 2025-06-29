import type { Tables } from "database.types"
import { SORT_DIRECTION, FILTER_TYPE } from "./PedalSelector"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

type PedalSelectorComponentProps = {
  pedalList: Tables<'pedals'>[] | null | undefined,
  savePedalDataById: (event: React.MouseEvent<HTMLButtonElement>) => void,
  deletePedalDataById?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  myPedalIdList?: number[],
  filterList: string[],
  handleSortClick: (direction: SORT_DIRECTION) => (event: React.MouseEvent<HTMLButtonElement>) => void,
  handleFilterClick: (type: FILTER_TYPE, secondary: string) => (event: React.MouseEvent<HTMLButtonElement>) => void,
  className?: string,
  children?: React.ReactNode
}

const PedalSelectorComponent = ({
  className = '',
  children
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
        {children}
      </DialogContent>
    </Dialog >
  )
}

export { PedalSelectorComponent }
