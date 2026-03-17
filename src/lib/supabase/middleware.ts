import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
  //RICHIESTA HTTP, RESPONSE HTTP

//aggiorna la sessione Supabase ad ogni richiesta, refresh i token, sincronizza i cookie tra request e response
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  }) //creazione response iniziale, xk i cookie sono legati alla response, quindi ne devi creare una nuova
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        }, //legge i cookie dalla richiesta
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set(name, value)  //aggiorna i cookie sul server interno (cosi supabase vede i cookie aggiornati)
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set(name, value, options)  //aggiorna i cookie sul client cosi il browser vede i cookie aggiornati
        }, 
        remove(name: string, options: CookieOptions) {
          request.cookies.set(name, '')
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set(name, '', options)
        }, //svuota i cookie sia sul server interno che sul client browser
      },
    }
  )
  await supabase.auth.getUser()  //REFRESH SESSIONE!!
  return response
}
