import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type MyGearDisplayData = {
  pedals?: {
    name: string
    img: string
    type: string[]
    mfg: string
    description?: string
  }
  boards?: {
    name: string
    img: string
    type: string[]
    mfg: string
    description?: string
  }
  notes?: {
    plain: string
  }
}

// TODO: Define proper types
type MyGearDisplayProps = {
  data?: MyGearDisplayData
  onSubmitSaveNotes?: (event: React.FormEvent<HTMLFormElement>) => void
  gearType?: 'pedals' | 'boards'
}

const MyGearDisplay = ({
  data = {}, onSubmitSaveNotes = () => { }, gearType = 'pedals'
}: MyGearDisplayProps) => {
  return (
    <div className="mt-8 px-8">
      <div className="flex flex-row gap-8 justify-center">
        <img
          src={`/src/assets/${data?.[gearType]?.img}`}
          alt={data?.[gearType]?.name}
          width={250}

          className="min-w-[250px] h-max drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)] "
        />
        <section>
          <div className="flex flex-row justify-start items-baseline gap-2">
            <h3 className="text-2xl font-heading">{data?.[gearType]?.name}</h3>
            <h3>{data?.[gearType]?.mfg}</h3>
          </div>
          <div className="flex flex-row gap-2 flex-wrap">
            {data?.[gearType]?.type?.map((type) => {
              return <Badge key={type}>{type}</Badge>
            })}
          </div>
          {data?.[gearType]?.description && (
            <>
              <Separator className="my-4" />
              <p className="mt-4">{data?.[gearType]?.description}</p>
              <Separator className="my-4" />
            </>
          )}
          <form
            onSubmit={onSubmitSaveNotes}
          >
            <h3 className="mt-4 mb-2 font-heading">My Notes:</h3>
            <Textarea
              name="notes"
              className="w-full"
              defaultValue={data?.notes?.plain || ''}
              placeholder="Add notes about how you use this pedal, and any settings you like." />
            <Button type="submit" className="mt-2 btn btn-outline">Save Notes</Button>
          </form>
        </section>
      </div>

    </div >
  )

}

export { MyGearDisplay }
