import { Fragment } from "react"
import { Link } from "react-router"
import { useGetMyBoards } from "@/queryHooks/myGear/useGetMyBoards"

const MyGearBoardsList = () => {
  const { isLoading, isSuccess, data } = useGetMyBoards()

  if (isLoading) return <h2>...Loading</h2>
  if (!isSuccess || !data || data.length === 0) {
    return <h2>No Boards Found</h2>
  }
  return (
    <section className="flex flex-wrap mt-4 gap-y-6 justify-between  w-10/12 mx-auto">
      {data && data?.map((board) => {
        return (
          <Fragment key={board?.boards?.id || board?.board_id}>
            <Link
              className="w-[30%] overflow-hidden relative group bg-linear-(--my-gear-item-bg) shadow-my-gear-item hover:shadow-my-gear-item-hover transition-all flex p-8 rounded-2xl gap-8"
              to={`/my-gear/boards/${board?.id}/${board?.boards?.id}/${encodeURIComponent(board?.boards?.name.replace(/ /g, '-'))}`}>
              <div className="z-10 transition-all absolute w-0 h-full top-0 right-0 bg-linear-(--my-gear-item-bg-hover) group-hover:w-full group-hover:opacity-100 shadow-my-gear-item-hover-highlight "></div>
              <img width="50"
                src={`/src/assets/${board?.boards?.img}`} className="z-11 max-w-[50px] max-h-fit"
              />
              <div className="z-11">
                <h4 className="text-xl font-heading line-clamp-2">{board?.boards?.name}</h4>
              </div>
            </Link>
          </Fragment>
        )
      })}
    </section >
  )
}

export { MyGearBoardsList }
