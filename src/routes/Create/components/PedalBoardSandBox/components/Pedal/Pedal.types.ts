import type { Database } from "../../../../../../../database.types"


export type PedalShape = Database['public']['Tables']['pedals']['Row']
export type BoardShape = Database['public']['Tables']['user_boards']['Row']
export type UpdateBoardShape = Database['public']['Tables']['user_boards']['Insert']

export interface DraggablePedalShape extends PedalShape {
  dragId: number
  rotation: number
}

export type PedalProps = {
  w: number,
  h: number,
  x: number,
  y: number,
  rotation: number,
  pedalId: string,
  img?: string | null,
  name?: string,
  handleRemove?: (key: keyof DraggablePedalShape, value: string) => void
}
