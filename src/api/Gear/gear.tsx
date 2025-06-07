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
      //.select("*");
      .select(`id, notes, pedal_id, pedals(id, name, img, type, mfg, description)`);

    return { data, error }
  }

  saveUserPedal = async ({ pedal_id, notes = {} }: { pedal_id: number, notes: Record<string, string> }) => {
    const { data, error } = await this.db
      .from('user_pedals')
      .upsert({ pedal_id, notes }, { onConflict: 'pedal_id, user_id' })
      .select()

    return { data, error }
  }

  updateUserPedal = async ({ id, notes }: { id: number, notes: string }) => {
    const { data, error } = await this.db
      .from('user_pedals')
      .update({ notes: { plain: notes } })
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
      .select(`id, notes, pedal_id, pedals(id, name, img, type, mfg, description)`)
      .eq('id', userPedalId)

    return { data, error }
  }
}

export { Gear }
