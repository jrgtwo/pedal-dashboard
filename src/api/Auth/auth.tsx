import type { SupabaseClient } from "@supabase/supabase-js"
import { throwOnError } from "../helpers"

class Auth {
  db
  constructor({ db }: { db: SupabaseClient }) {
    this.db = db
  }

  getSession = async () => {
    const { data, error } = await this.db.auth.getSession()
    return throwOnError({ data, error })
  }

  login = async ({
    email, password
  }: {
    email: string, password: string
  }) => {
    const { data, error } = await this.db.auth.signInWithPassword({
      email,
      password
    })

    return throwOnError({ data, error })
  }

  logout = async () => {
    const { error } = await this.db.auth.signOut()

    return throwOnError({ error })
  }

  register = async ({
    email, password
  }: {
    email: string, password: string
  }) => {
    const { data, error } = await this.db.auth.signUp({
      email,
      password
    })

    return throwOnError({ data, error })
  }
}
export { Auth }
