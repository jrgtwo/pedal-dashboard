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
      .select("*");

    return { data, error }
  }

  saveUserPedal = async ({ pedal_id }) => {
    const { data, error } = await this.db
      .from('user_pedals')
      .upsert({ pedal_id, notes: {} }, { onConflict: 'pedal_id, user_id' })
      .select()

    return { data, error }
  }
}

export { Gear }
