import type { Database } from "../../../../../../../database.types"


export type PedalShape = Database['public']['Tables']['pedals']['Row']
export type BoardShape = Database['public']['Tables']['user_boards']['Row']
export type UpdateBoardShape = Database['public']['Tables']['user_boards']['Insert']

export type PedalProps = {
  w: number,
  h: number,
  x: number,
  y: number,
  pedalId: string,
  img?: string,
  name?: string,
  handleRemove: (key: keyof PedalShape, value: string) => void
}
