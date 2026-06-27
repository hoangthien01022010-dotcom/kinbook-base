// kinbook – base44 -> supabase adapter
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// giữ nguyên export tên base44 để khỏi sửa cả app
export const base44 = {
  auth: {
    me: async () => (await supabase.auth.getUser()).data.user || null,
    signInWithGoogle: () => supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    }),
    signOut: () => supabase.auth.signOut()
  },
  entities: new Proxy({}, {
    get: (_, table) => ({
      list: async (q) => (await supabase.from(table).select('*')).data || [],
      get: async (id) => (await supabase.from(table).select('*').eq('id', id).single()).data,
      create: async (d) => (await supabase.from(table).insert(d).select().single()).data,
      update: async (id, d) => (await supabase.from(table).update(d).eq('id', id).select().single()).data,
      delete: async (id) => supabase.from(table).delete().eq('id', id)
    })
  }),
  // giữ shape cũ cho mấy chỗ gọi base44.functions
  functions: { invoke: async () => ({ ok: true }) }
}
