
import { Link, useNavigate } from 'react-router'
import { useGetBoards } from '../../queryHooks/pedalBoard/useGetBoards'


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

const MyBoards = () => {
  const navigate = useNavigate()
  const { isError, isLoading, boards, error } = useGetBoards()

  return (
    <section className="w-11/12 mx-auto mt-8">
      <h2 className="text-3xl font-[Bebas_Neue]">My Boards</h2>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created on:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? (
              <TableRow>
                <TableCell><Checkbox /></TableCell>
                <TableCell>...Loading</TableCell>
                <TableCell></TableCell>
              </TableRow>
            )
            : isError
              ? (
                <TableRow>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell>...Error:{error?.message} </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )
              : boards && boards.length > 0
                ? boards.map((board) => {
                  return (
                    <TableRow onClick={(() => navigate(`/create/${board.id}`))} key={board.id} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <TableCell><Checkbox /></TableCell>
                      <TableCell
                        key={board.id}
                        className="p-6\">
                        <Link
                          to={`/create/${board.id}`}
                          className="hover:underline">
                          Board: {board.id} - {board.name}
                        </Link>
                      </TableCell>
                      <TableCell>{new Date(board.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  )
                }) : <p>No Boards found</p>
          }
        </TableBody>
      </Table>
    </section >
  )
}

export { MyBoards }
