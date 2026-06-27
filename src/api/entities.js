import { supabase } from '@/lib/supabaseClient'

const makeEntity = (table) => ({
  list: async (order = '-created_at') => {
    const ascending = !order.startsWith('-')
    const column = order.replace('-', '')
    const { data, error } = await supabase.from(table).select('*').order(column, { ascending })
    if (error) throw error
    return data
  },
  get: async (id) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
    if (error) throw error
    return data
  },
  create: async (obj) => {
    const { data, error } = await supabase.from(table).insert(obj).select().single()
    if (error) throw error
    return data
  },
  update: async (id, obj) => {
    const { data, error } = await supabase.from(table).update(obj).eq('id', id).select().single()
    if (error) throw error
    return data
  },
  delete: async (id) => {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
    return true
  }
})

export const User = makeEntity('users')
export const Conversation = makeEntity('conversations')
export const Message = makeEntity('messages')
export const Friendship = makeEntity('friendships')
export const Notification = makeEntity('notifications')
