import type { Database } from "../../../database.types"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { UpdateBoardShape } from "../../routes/Create/components/PedalBoardSandBox/components/Pedal/Pedal.types"
import { throwOnError } from "../helpers";

class PedalBoard {
  db

  constructor({ db }: { db: SupabaseClient<Database> }) {
    this.db = db
  }

  getAllPedals = async () => {
    const response = await this.db
      .from('pedals')
      .select()
    return throwOnError(response)
  }

  getAllBoards = async () => {
    const response = await this.db
      .from('boards')
      .select()
    return throwOnError(response)
  }

  getBoardById = async (id: number) => {
    const response = await this.db
      .from('user_pedalboards')
      .select('*')
      .eq('id', id)
      .limit(1)

    return throwOnError(response)
  }

  getUserBoards = async () => {
    const response = await this.db
      .from('user_pedalboards')
      .select('*')

    return throwOnError(response)
  }

  saveBoard = async (toSave: UpdateBoardShape) => {
    if (!toSave.board) throwOnError({ error: 'no board found', data: null })

    const response = await this.db
      .from('user_pedalboards')
      .upsert(toSave)
      .select()

    return throwOnError(response)
  }

  deleteBoard = async (ids: number | number[]) => {
    if (!ids) return throwOnError({ error: 'no ids provided', data: null })

    const idsArray = Array.isArray(ids) ? ids : [ids]

    const response = await this.db
      .from('user_pedalboards')
      .delete()
      .in('id', idsArray)

    return throwOnError(response)
  }
}

export { PedalBoard }
