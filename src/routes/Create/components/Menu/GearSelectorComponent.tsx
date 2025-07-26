import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

type GearSelectorComponentProps = {
  className?: string,
  children?: React.ReactNode
}

const GearSelectorComponent = ({
  className = '',
  children
}: GearSelectorComponentProps) => {

  return (
    <Dialog>
      <DialogTrigger className={`${className}`}>
        Gear Selector
      </DialogTrigger>
      <DialogContent className="flex h-9/12 max-h-9/12 max-w-9/12 w-9/12 sm:max-w-9/12 sm:w-9/12 overflow-hidden">
        <DialogTitle className="hidden">Gear Selector</DialogTitle>
        <DialogDescription className="hidden">
          Select a pedal to add to your gear.
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog >
  )
}

export { GearSelectorComponent }
