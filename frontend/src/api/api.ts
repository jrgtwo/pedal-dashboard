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

class _API {
  getAllPedals = getAllPedals
}
const API = new _API();
export { API }


