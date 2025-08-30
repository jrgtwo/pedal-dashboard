import { Separator } from "@/components/ui/separator"
import { AddGear } from "./AddGear"
import { GearBreadcrumbs } from "./GearBreadcrumbs"

import { MyGearPedalsList } from "./MyGearPedalsList"
import { MyGearBoardsList } from "./MyGearBoardsList"

const MyGear = () => {

  return (
    <>
      <section className="flex gap-16 mt-4 mb-4">
        <GearBreadcrumbs />
        <AddGear />
      </section>
      <Separator />
      <div className="flex flex-col mx-auto w-full justify-items-center">
        <h2 className="text-4xl font-heading mt-4 px-8">Pedals</h2>
        <MyGearPedalsList />
        <Separator className="my-8" />
        <h2 className="text-4xl font-heading mt-4 px-8">Boards</h2>
        <MyGearBoardsList />
      </div>
    </>
  )
}

export { MyGear }
