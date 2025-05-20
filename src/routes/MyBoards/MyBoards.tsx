
import { Link } from 'react-router'
import { useGetBoards } from '../../queryHooks/useGetBoards'

const MyBoards = () => {
  const { isError, isLoading, boards, error } = useGetBoards()

  return (
    <section>
      <h2>My Boards</h2>
      {isLoading
        ? <h2>...Loading</h2>
        : isError
          ? <h2>Error: {error?.message}</h2>
          : boards && boards.length > 0
            ? boards.map((board) => {
              return (
                <div
                  key={board.id}
                  className="p-6 rounded-2xl border-gray-200 border-1">
                  <Link
                    to={`/create/${board.id}`}
                    className="hover:underline">
                    Board: {board.id} - {board.name}
                  </Link>
                </div>
              )
            }) : <p>No Boards found</p>
      }

    </section >
  )
}

export { MyBoards }
