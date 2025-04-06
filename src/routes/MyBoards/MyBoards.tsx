import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { API } from '../../api/api'

const MyBoards = () => {
  const [boards, setBoards] = useState(null)

  useEffect(() => {
    (async () => {
      const { data, error } = await API.getBoards()
      if (error) {
        console.log(error)
        return
      }
      setBoards(data)
    })()

  }, [])

  return (
    <section>
      <h2>My Boards</h2>
      {
        boards
          ? boards.map((board) => {
            return (
              <div
                className="p-6 rounded-2xl border-gray-200 border-1">
                <Link
                  to={`/create/${board.id}`}
                  className="hover:underline">
                  Board: {board.id} - {board.name}
                </Link>
                <pre>{JSON.stringify(board, null, 2)}</pre>
              </div>
            )
          }) : <p>No Boards found</p>
      }
    </section >
  )
}

export { MyBoards }
