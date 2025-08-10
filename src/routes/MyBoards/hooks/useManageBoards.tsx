import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router'
import { useDeleteBoard } from '@/queryHooks/pedalBoard/useDeleteBoard';
import { useQueryClient } from '@tanstack/react-query'

const useManageBoards = () => {
  const navigate = useNavigate()
  const { mutation } = useDeleteBoard()
  const queryClient = useQueryClient()

  const [selectedBoards, setSelectedBoards] = useState(new Set<number>())

  const handleDelete = () => {
    // Call delete API here
    mutation.mutate([...selectedBoards])
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

  useEffect(() => {
    if (!mutation.isSuccess) return;
    toast.success('Boards deleted successfully!')
    setSelectedBoards(new Set<number>())
    queryClient.invalidateQueries({ queryKey: ['myBoards'] })
  }, [mutation.isSuccess, queryClient])
  return {
    selectedBoards,
    handleDelete,
    handleClick
  }
}

export { useManageBoards }
