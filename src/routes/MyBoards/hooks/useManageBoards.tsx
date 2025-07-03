import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router'

const useManageBoards = () => {
  const navigate = useNavigate()
  const [selectedBoards, setSelectedBoards] = useState(new Set<number>())

  const handleDelete = () => {
    console.log([...selectedBoards])
    // Call delete API here
    toast.success('Boards deleted successfully!')
  }

  const handleClick = useCallback((event: React.MouseEvent<HTMLTableRowElement | HTMLButtonElement>, id: number) => {
    const target = event.target;

    if (target?.type === 'button') {
      if (target?.dataset.state === 'unchecked') {
        setSelectedBoards((prev) => new Set([...prev, id]))
      } else {
        setSelectedBoards((prev) => new Set([...prev].filter((boardId) => boardId !== id)))
      }
      return;
    }

    navigate(`/create/${id}`)
  }, [navigate]);

  return {
    selectedBoards,
    handleDelete,
    handleClick
  }
}

export { useManageBoards }
