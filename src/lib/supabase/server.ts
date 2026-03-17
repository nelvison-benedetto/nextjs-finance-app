import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'  //API Next.js per leggere/scrivere cookie lato server

export async function createClient() {
  const cookieStore = await cookies()  //accesso ai cookie della richiesta HTTP

  return createServerClient(  //creazione client supabase
    process.env.NEXT_PUBLIC_SUPABASE_URL!,  //url progetto supabase
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,  //anon key
    {
      cookies: {
        //here dici a supabase come leggere e scrivere i cookie in Next.js
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // Ignored when called from a Server Component
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // Ignored when called from a Server Component
          }
        },
      },
    }
  )
}
