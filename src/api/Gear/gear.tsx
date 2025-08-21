import type { SupabaseClient } from "@supabase/supabase-js"

class Gear {
  db

  constructor({ db }: { db: SupabaseClient }) {
    this.db = db
  }

  getMyGear = async () => {
    let resData, resError

    try {
      const { data, error } = await this.db
        .from('user_gear')
        .select("*");

      resData = data
      resError = error
    } catch (err) {
      resError = err
      console.log(err)
    }

    return { data: resData, error: resError }
  }

  getMyPedals = async () => {
    const { data, error } = await this.db
      .from('user_pedals')
      .select(`id, notes, title, pedal_id, pedals(id, name, img, type, mfg, description)`);

    return { data, error }
  }

  getMyBoards = async () => {
    // TODO: currently user_boards is for fully built board layouts
    // we need to either change that name or create a new table for user boards
    const { data, error } = await this.db
      .from('user_boards')
      .select(`id, notes, title, board_id, boards(id, name, img, type, mfg, description)`);

    return { data, error }
  }

  saveUserPedal = async ({ pedal_id, notes = {} }: { pedal_id: number, notes: Record<string, string> }) => {

    const { data, error } = await this.db
      .from('user_pedals')
      .upsert({ pedal_id, notes }, { onConflict: 'pedal_id, user_id' })
      .select()

    return { data, error }
  }

  updateUserPedal = async ({ id, notes, title }: { id: number, notes?: string, title?: string }) => {
    const toUpdate = {}
    if (notes) toUpdate.notes = { plain: notes }
    if (title) toUpdate.title = title

    const { data, error } = await this.db
      .from('user_pedals')
      .update(toUpdate)
      .eq('id', id)
      .select()
    return { data, error }
  }

  deleteUserPedal = async ({ pedal_id }: { pedal_id: number }) => {
    const deleteRes = await this.db
      .from('user_pedals')
      .delete()
      .eq('pedal_id', pedal_id)
      .select()

    return deleteRes
  }

  getMyPedalById = async ({ userPedalId }: { userPedalId: number }) => {
    const { data, error } = await this.db
      .from('user_pedals')
      .select(`id, notes, title, pedal_id, pedals(id, name, img, type, mfg, description)`)
      .eq('id', userPedalId)

    return { data, error }
  }
}

export { Gear }
