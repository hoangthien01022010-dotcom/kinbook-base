import { supabase } from './supabaseClient'

export const Conversation = {
  list: async () => {
    const { data } = await supabase.from('conversations').select('*').order('updated_at', { ascending: false })
    return data || []
  },
  create: async (obj) => {
    const { data } = await supabase.from('conversations').insert(obj).select().single()
    return data
  }
}

export const Message = {
  filter: async ({ conversation_id }) => {
    const { data } = await supabase.from('messages').select('*').eq('conversation_id', conversation_id).order('created_at')
    return data || []
  },
  create: async (obj) => {
    const { data } = await supabase.from('messages').insert(obj).select().single()
    return data
  }
}

export const User = {}
export const Friendship = {}
export const Notification = {}
