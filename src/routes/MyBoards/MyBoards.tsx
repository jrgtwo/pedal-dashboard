
import { Link } from 'react-router'
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
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useManageBoards } from './hooks/useManageBoards'

const MyBoards = () => {
  const { isError, isLoading, boards, error } = useGetBoards()

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
      <Table className="text-xl">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Snapshot</TableHead>
            <TableHead>Created on:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? (
              <TableRow>
                <TableCell></TableCell>
                <TableCell>...Loading</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            )
            : isError
              ? (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>...Error:{error?.message} </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )
              : boards && boards.length > 0
                ? boards.map((board) => {
                  return (
                    <TableRow
                      onClick={(event) => handleClick(event, board.id)}
                      key={board.id}
                      className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedBoards.has(board.id) ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell
                        key={board.id}
                        className="p-6">
                        <Link
                          to={`/ create / ${board.id}`}
                          className="hover:underline">
                          {board.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {board.snapshot
                          ? <img
                            className="max-h-[100px] w-auto object-contain"
                            src={board.snapshot}
                            alt={board.name || ""} />
                          : <p>No Snapshot</p>}
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
