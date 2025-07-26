
import { Link } from 'react-router'
import { useGetBoards } from '../../queryHooks/pedalBoard/useGetBoards'
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useManageBoards } from './hooks/useManageBoards'

const MyBoards = () => {
  const { isError, isLoading, boards } = useGetBoards()

  const {
    selectedBoards,
    handleDelete,
    handleClick
  } = useManageBoards();

  return (
    <section className={`w-full mx-auto `}>
      <div className="flex items-center justify-between">
        <h2 className="my-4 text-4xl font-heading">My Boards</h2>
        {selectedBoards.size > 0 && (
          <div className="mb-4">
            <Button
              onClick={handleDelete}
              variant="destructive">Delete</Button>
          </div>
        )}
      </div>
      <Separator className="mb-8" />
      <div className="flex felx-col gap-4">
        {isLoading
          ? (
            <h2>Loading</h2>
          )
          : isError
            ? (
              <h2>Error</h2>
            )
            : boards && boards.length > 0
              ? boards.map((board) => {
                return (
                  <div
                    onClick={(event) => handleClick(event, board.id)}
                    key={board.id}
                    className={
                      `flex overflow-hidden relative group bg-linear-(--my-gear-item-bg) shadow-my-gear-item hover:shadow-my-gear-item-hover transition-all p-8 rounded-2xl gap-8
                      cursor-pointer `
                    }>

                    <Checkbox className="z-11 w-12 h-12 rounded-lg m-auto" />
                    <div className="z-10 transition-all absolute w-0 h-full top-0 right-0 bg-linear-(--my-gear-item-bg-hover) group-hover:w-full group-hover:opacity-100 shadow-my-gear-item-hover-highlight "></div>
                    <div className="flex flex-col gap-2">
                      <Link
                        className="font-heading text-2xl z-11"
                        to={`/create/${board.id}`}>
                        {board.name}
                      </Link>
                      <span className="text-sm z-11">{new Date(board.created_at).toLocaleDateString()}</span>
                    </div>
                    {
                      board.snapshot
                        ? <img
                          className="max-h-[100px] w-auto object-contain rounded-2xl border-1 z-11"
                          src={board.snapshot}
                          alt={board.name || ""} />
                        : <p>No Snapshot</p>
                    }


                  </div>
                )
              }) : <p>No Boards found</p>
        }

      </div>

    </section >
  )
}

export { MyBoards }
