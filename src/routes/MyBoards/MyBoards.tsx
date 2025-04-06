import { useEffect, useState } from 'react'
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
        boards && boards.map((board) => {
          return (
            <div
              className="p-6 rounded-2xl border-gray-200 border-1">
              <p>Board: {board.id}</p>
              <pre>{JSON.stringify(board, null, 2)}</pre>
            </div>
          )
        })
      }
    </section>
  )
}

export { MyBoards }
