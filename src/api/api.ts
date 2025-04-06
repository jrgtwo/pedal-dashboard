import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_DB_URL
const supabaseKey = import.meta.env.VITE_DB_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

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

const saveBoard = async ({ board }) => {
  if (!board) return false

  const { data, error } = await supabase
    .from('user_boards')
    .upsert({ board })
    .select()

  return { data, error }
}

const getBoards = async () => {
  const { data, error } = await supabase
    .from('user_boards')
    .select('*')

  debugger

  return { data, error }
}

class _API {
  getAllPedals = getAllPedals
  register = register
  login = login
  getSession = getSession
  saveBoard = saveBoard
  getBoards = getBoards
}
const API = new _API();
export { API }
