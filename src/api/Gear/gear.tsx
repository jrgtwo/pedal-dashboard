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
    debugger

    return { data: resData, error: resError }
  }

}

export { Gear }
