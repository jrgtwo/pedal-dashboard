import html2canvas from 'html2canvas-pro';
import { toast } from 'sonner';
import type { UpdateBoardShape } from '../../Pedal/Pedal.types';
import type { DraggablePedalShape } from '../../Pedal/Pedal.types';
import type { User } from '@supabase/supabase-js';

type SaveHandlerProps<T> = {
  mutation: T | null | undefined,
  boardName?: string | null,
  user: User | null,
  pedals: DraggablePedalShape[] | null,
  boardId: UpdateBoardShape['id'] | null
}

async function saveHandler<T>({
  mutation,
  pedals,
  user,
  boardName,
  boardId
}: SaveHandlerProps<T>) {
  if (!user || !pedals) return

  const toSave: UpdateBoardShape = {
    board: JSON.stringify(pedals || {}),
  };
  if (boardName) {
    toSave.name = boardName
  }

  if (boardId) {
    toSave.id = boardId
  }

  toSave.snapshot = null

  try {
    const canvas = await html2canvas(document.getElementById('pedal-dashboard-sandbox') as HTMLElement)
    const canvasToImg = canvas.toDataURL('image/jpeg', 1)

    toSave.snapshot = canvasToImg || null
  } catch (error) {
    console.error('Error capturing canvas:', error);
    toast.error('Failed to capture board image.')
  }

  mutation?.mutate(toSave)
}

export { saveHandler }
