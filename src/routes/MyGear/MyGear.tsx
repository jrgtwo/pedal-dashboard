import { Fragment } from "react"
import { Link } from "react-router"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"
import { Separator } from "@/components/ui/separator"
import { AddGear } from "./AddGear"
import { Badge } from "@/components/ui/badge"

const MyGear = () => {
  const { isLoading, isSuccess, data } = useGetMyPedals()

  if (isLoading) return <h2>...Loading</h2>
  if (!isSuccess || !data || data.length === 0) return <h2>No Pedals Found</h2>
  return (
    <>
      <div className="flex items-center gap-8">
        <h2 className="my-4 text-4xl font-heading">My Gear</h2>
        <AddGear />
      </div>
      <Separator />
      <div className="flex flex-col w-9/12 mx-auto justify-items-center">

        <section className="flex flex-col">
          <h3 className="mt-8 text-4xl font-heading">My Pedals</h3>
          <Separator className="mt-4 mb-8" />
          {data && data?.map((pedal) => {
            return (
              <Fragment key={pedal?.pedals?.id || pedal?.pedal_id}>
                <Link
                  className="flex p-8 hover:bg-gray-200 rounded-2xl gap-8 even:bg-gray-100 odd:bg-white"
                  to={`/my-gear/pedals/${pedal?.id}/${pedal?.pedals?.id}/${encodeURIComponent(pedal?.pedals?.name.replace(/ /g, '-'))}`}>
                  <img width="50" src={`/src/assets/${pedal?.pedals?.img}`} />
                  <div>
                    <h4 className="text-xl font-heading">{pedal?.pedals?.name}</h4>
                    <div className="flex gap-2">
                      {pedal?.pedals?.type.map((type, index) => {
                        return <Badge key={type}>{type}</Badge>
                      })}
                    </div>
                  </div>
                </Link>
              </Fragment>
            )
          })}
        </section >
      </div >
    </>
  )
}

export { MyGear }
