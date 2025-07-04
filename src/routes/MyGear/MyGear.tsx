import { Fragment } from "react"
import { Link } from "react-router"
import { useGetMyPedals } from "@/queryHooks/myGear/useGetMyPedals"
import { Separator } from "@/components/ui/separator"
import { AddGear } from "./AddGear"
import { Badge } from "@/components/ui/badge"
import { GearBreadcrumbs } from "./GearBreadcrumbs"
const MyGear = () => {
  const { isLoading, isSuccess, data } = useGetMyPedals()

  if (isLoading) return <h2>...Loading</h2>
  if (!isSuccess || !data || data.length === 0) return <h2>No Pedals Found</h2>
  return (
    <>
      <section className="flex gap-16 mt-4 mb-4">
        <GearBreadcrumbs />
        <AddGear />
      </section>
      <Separator />
      <div className="flex flex-col w-9/12 mx-auto justify-items-center">

        <section className="flex flex-col mt-4 gap-1">
          {data && data?.map((pedal) => {
            return (
              <Fragment key={pedal?.pedals?.id || pedal?.pedal_id}>
                <Link
                  className="overflow-hidden relative group bg-linear-(--my-gear-item-bg) shadow-my-gear-item hover:shadow-my-gear-item-hover transition-all flex p-8 rounded-2xl gap-8"
                  to={`/my-gear/pedals/${pedal?.id}/${pedal?.pedals?.id}/${encodeURIComponent(pedal?.pedals?.name.replace(/ /g, '-'))}`}>
                  <div className="z-10 transition-all absolute w-0 h-full top-0 right-0 bg-linear-(--my-gear-item-bg-hover) group-hover:w-full group-hover:opacity-100 shadow-my-gear-item-hover-highlight "></div>
                  <img width="50" src={`/src/assets/${pedal?.pedals?.img}`} className="z-11" />
                  <div className="z-11">
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
