import type { SupabaseClient } from "@supabase/supabase-js"

class Auth {
  db
  constructor({ db }: { db: SupabaseClient }) {
    this.db = db
  }

  getSession = async () => {
    const { data, error } = await this.db.auth.getSession()
    return { data, error }
  }

  login = async ({
    email, password
  }: {
    email: string, password: string
  }) => {
    debugger
    const { data, error } = await this.db.auth.signInWithPassword({
      email,
      password
    })

    return { data, error }
  }

  logout = async () => {
    const { error } = await this.db.auth.signOut()

    return { error }
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

    return { data, error }
  }
}
export { Auth }
