
import { Tables } from "database.types"
import { Button } from "@/components/ui/button"

type PedalListProps = {
  pedalList: Tables<'pedals'>[] | null | undefined,
  savePedalDataById: (event: React.MouseEvent<HTMLButtonElement>) => void,
  deletePedalDataById?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  myPedalIdList?: number[],
}

export const PedalList = ({ pedalList, savePedalDataById, deletePedalDataById, myPedalIdList }: PedalListProps) => {
  return (
    <main className="overflow-scroll w-full">
      <h2>Select a Pedal</h2>
      <section className="flex flex-wrap mt-4 gap-2">
        {pedalList && pedalList.map((item) => {
          const isOwned = myPedalIdList?.includes(item.id)
          return (
            <div
              className="bg-linear-(--pedal-bg) shadow-pedal-selector w-[200px] h-[200px] relative group p-4 hover:bg-gray-200 rounded-2xl gap-8 overflow-hidden"
              key={`${item.name}:${item.id}`}>
              {isOwned && (
                <div className="shadow-pedal-selector font-bold absolute bg-amber-500 rotate-[-45deg] text-white text-xs px-12 pt-12 pb-2 top-[-28px] left-[-60px] ">Owned</div>
              )}
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
  )
}
