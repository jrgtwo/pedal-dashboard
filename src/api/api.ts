import { createClient } from '@supabase/supabase-js'
import { Database } from '../../database.types'
import { Auth } from './Auth/auth'
import { PedalBoard } from './PedalBoard/pedalBoard'

const supabaseUrl = import.meta.env.VITE_DB_URL
const supabaseKey = import.meta.env.VITE_DB_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

class _API {
  auth
  pedalBoard

  constructor() {
    this.auth = new Auth({ db: supabase })
    this.pedalBoard = new PedalBoard({ db: supabase })
  }
}

const API = new _API();
export { API }
