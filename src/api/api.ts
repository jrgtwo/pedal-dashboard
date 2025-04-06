import { createClient } from '@supabase/supabase-js'
import { Database } from '../../supabase/database.types'
import type { PedalShape } from '../routes/Create/components/PedalBoardSandBox/components/Pedal/Pedal.types'

const supabaseUrl = import.meta.env.VITE_DB_URL
const supabaseKey = import.meta.env.VITE_DB_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

const getAllPedals = async () => {
  const { data, error } = await supabase
    .from('pedals')
    .select()
  return { data, error }
}

const login = async ({
  email, password
}: {
  email: string, password: string
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  return { data, error }
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  return { error }
}

const register = async ({
  email, password
}: {
  email: string, password: string
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  return { data, error }
}

const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()

  return { data, error }
}

const saveBoard = async ({
  id, name, board
}: {
  id: number, name: string, board: PedalShape[]
}) => {
  if (!board) return false

  const { data, error } = await supabase
    .from('user_boards')
    .upsert({ id, name, board })
    .select()

  return { data, error }
}

const getBoards = async () => {
  const { data, error } = await supabase
    .from('user_boards')
    .select('*')

  return { data, error }
}

const getBoardById = async (id: number) => {
  const { data, error } = await supabase
    .from('user_boards')
    .select('*')
    .eq('id', id)
    .limit(1)

  return { data, error }
}

class _API {
  getAllPedals = getAllPedals
  register = register
  login = login
  logout = logout
  getSession = getSession
  saveBoard = saveBoard
  getBoards = getBoards
  getBoardById = getBoardById
}
const API = new _API();
export { API }
