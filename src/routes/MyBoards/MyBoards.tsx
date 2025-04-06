import type { Database } from '../../../database.types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { API } from '../../api/api'

type USER_BOARD = Database['public']['Tables']['user_boards']['Row']

const MyBoards = () => {
  const [boards, setBoards] = useState<USER_BOARD[] | null>(null)

  useEffect(() => {
    (async () => {
      const { data, error } = await API.pedalBoard.getBoards()
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
