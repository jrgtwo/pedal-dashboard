import { Separator } from "@/components/ui/separator"


import { MyGearPedalsList } from "./MyGearPedalsList.tsx"
import { MyGearBoardsList } from "./MyGearBoardsList.tsx"

const MyGear = () => {

  return (
    <>

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
