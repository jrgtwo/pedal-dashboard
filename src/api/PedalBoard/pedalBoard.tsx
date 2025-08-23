import type { Database } from "../../../database.types"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { UpdateBoardShape } from "../../routes/Create/components/PedalBoardSandBox/components/Pedal/Pedal.types"

class PedalBoard {
  db

  constructor({ db }: { db: SupabaseClient<Database> }) {
    this.db = db
  }

  getAllPedals = async () => {
    const { data, error } = await this.db
      .from('pedals')
      .select()
    return { data, error }
  }

  getAllBoards = async () => {
    const { data, error } = await this.db
      .from('boards')
      .select()
    return { data, error }
  }

  getBoardById = async (id: number) => {
    const { data, error } = await this.db
      .from('user_pedalboards')
      .select('*')
      .eq('id', id)
      .limit(1)

    return { data, error }
  }

  getUserBoards = async () => {
    const { data, error } = await this.db
      .from('user_pedalboards')
      .select('*')

    return { data, error }
  }

  saveBoard = async (toSave: UpdateBoardShape) => {
    if (!toSave.board) return { error: 'no board found', data: null }

    const { data, error } = await this.db
      .from('user_pedalboards')
      .upsert(toSave)
      .select()

    return { data, error }
  }

  deleteBoard = async (ids: number | number[]) => {
    if (!ids) return { error: 'no ids provided', data: null }

    const idsArray = Array.isArray(ids) ? ids : [ids]

    const { data, error } = await this.db
      .from('user_pedalboards')
      .delete()
      .in('id', idsArray)

    return { data, error }
  }
}

export { PedalBoard }
