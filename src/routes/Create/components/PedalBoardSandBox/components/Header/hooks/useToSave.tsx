import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query'

import { usePedalStore } from "../../Sandbox/store/pedal"
import { useLoginStore } from '../../../../../../../store/login'
import { useSaveBoard } from '../../../../../../../queryHooks/pedalBoard/useSaveBoard'

import { saveHandler } from '../handlers/saveHandler'

export const useToSave = () => {
  const queryClient = useQueryClient()
  const pedals = usePedalStore((state) => state.pedals)
  const boardName = usePedalStore((state) => state.name)
  const boardId = usePedalStore((state) => state.boardId)
  const user = useLoginStore((state) => state.user)
  const { mutation } = useSaveBoard()

  const saveBoard = useCallback(() => saveHandler<unknown>({
    mutation, pedals, user, boardName, boardId
  }), [mutation, pedals, user, boardName, boardId])

  useEffect(() => {
    if (mutation.isSuccess) {
      toast('Board saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['myBoards', boardId] })
    }
  }, [mutation.isSuccess, boardId, queryClient])

  return { saveBoard }
}
