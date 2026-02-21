import type { SupabaseClient } from "@supabase/supabase-js"
import { throwOnError } from "../helpers"

type Notes = { notes?: { plain: string }, title?: string }

class Gear {
  db

  constructor({ db }: { db: SupabaseClient }) {
    this.db = db
  }

  getMyGear = async () => {
    const response = await this.db
      .from('user_gear')
      .select("*");

    return throwOnError(response)
  }

  getMyPedals = async () => {
    const response = await this.db
      .from('user_pedals')
      .select(`id, notes, title, pedal_id, pedals(id, name, img, type, mfg, description)`);

    return throwOnError(response)
  }

  getMyBoards = async () => {
    const response = await this.db
      .from('user_boards')
      .select(`id, notes, title, board_id, boards(id, name, img, mfg, description)`);

    return throwOnError(response)
  }

  saveUserPedal = async ({ pedal_id, notes = {} }: { pedal_id: number, notes: Record<string, string> }) => {

    const response = await this.db
      .from('user_pedals')
      .upsert({ pedal_id, notes }, { onConflict: 'pedal_id, user_id' })
      .select()

    return throwOnError(response)
  }

  updateUserPedal = async ({ id, notes, title }: { id: number, notes?: string, title?: string }) => {
    const toUpdate: Notes = {}
    if (notes) toUpdate.notes = { plain: notes }
    if (title) toUpdate.title = title

    const response = await this.db
      .from('user_pedals')
      .update(toUpdate)
      .eq('id', id)
      .select()
    return throwOnError(response)
  }

  updateUserBoard = async ({ id, notes, title }: { id: number, notes?: string, title?: string }) => {
    const toUpdate: Notes = {}
    if (notes) toUpdate.notes = { plain: notes }
    if (title) toUpdate.title = title

    const response = await this.db
      .from('user_boards')
      .update(toUpdate)
      .eq('id', id)
      .select()
    return throwOnError(response)
  }

  deleteUserPedal = async ({ pedal_id }: { pedal_id: number }) => {
    const deleteRes = await this.db
      .from('user_pedals')
      .delete()
      .eq('pedal_id', pedal_id)
      .select()

    return throwOnError(deleteRes)
  }

  saveUserBoard = async ({ board_id, notes = {} }: { board_id: number, notes: Record<string, string> }) => {

    const response = await this.db
      .from('user_boards')
      .upsert({ board_id, notes }, { onConflict: 'board_id, user_id' })
      .select()
    return throwOnError(response)
  }

  deleteUserBoard = async ({ board_id }: { board_id: number }) => {

    const response = await this.db
      .from('user_boards')
      .delete()
      .eq('board_id', board_id)
      .select()

    return throwOnError(response)
  }

  getMyPedalById = async ({ userPedalId }: { userPedalId: number }) => {
    const response = await this.db
      .from('user_pedals')
      .select(`id, notes, title, pedal_id, pedals(id, name, img, type, mfg, description)`)
      .eq('id', userPedalId)

    return throwOnError(response)
  }

  getMyBoardById = async ({ userBoardId }: { userBoardId: number }) => {
    const response = await this.db
      .from('user_boards')
      .select(`id, notes, title, board_id, boards(id, name, img, mfg, description)`)
      .eq('id', userBoardId)

    return throwOnError(response)
  }
}

export { Gear }
