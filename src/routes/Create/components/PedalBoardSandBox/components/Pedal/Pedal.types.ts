import type { Database } from "../../../../../../../database.types"


export type PedalShape = Database['public']['Tables']['pedals']['Row']
export type BoardShape = Database['public']['Tables']['user_boards']['Row']
export type UpdateBoardShape = Database['public']['Tables']['user_boards']['Insert']

export interface DraggablePedalShape extends Omit<PedalShape, 'id' | 'created_at' | 'mfg' | 'description' | 'type'> {
  dragId: number | string
  rotation: number
  x: number
  y: number
}

export type PedalProps = {
  w: number | null,
  h: number | null,
  x?: number,
  y?: number,
  rotation: number,
  pedalId: string,
  img?: string | null,
  name?: string,
  gearType?: 'pedal' | 'board' | undefined | null,
  handleRemove?: (key: keyof DraggablePedalShape, value: string) => void
}
