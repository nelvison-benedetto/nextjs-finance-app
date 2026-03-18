import { createClient } from '@/lib/supabase/server'  //custom, gia configurato x cookies
import { NextRequest, NextResponse } from 'next/server' //richiesta & response http

//gira solo lato server, viene chiamata quando l’utente clicca il link email di Supabase

export async function GET(request: NextRequest) {  //viene chiamata quando fai una req GET (e.g.apri un link nel browser)
  const { searchParams } = new URL(request.url)  //trasformi url in obj leggibile (parsing)
  const token_hash = searchParams.get('token_hash')  //token secreto x auth
  const type = searchParams.get('type')  //tipo di operazione e.g.email(magic link login) / recovery(reset psw)
  const next = searchParams.get('next') ?? '/'  //dove andare dopo (redirect)

  const redirectTo = request.nextUrl.clone()  //cloni url corrente
  redirectTo.pathname = next  //editi il clone

  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')
  //clean i tokens

  if (token_hash && type) {  //controlli che esistano
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      type: type as 'email',
      token_hash,
    })  //supabase riceve token (token_hash), controlla esiste-èvalido-nonscaduto-nongiausato, se ok allora CREA SESSIONE (quindi genera access token & salva cookie), ora l'utente è loggato e puoi fare getUser() !!!
    if (!error) {  //se login ok...
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }
  //se login non-ok allora return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
