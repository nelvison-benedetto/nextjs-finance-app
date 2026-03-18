import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

//gira solo lato server, 

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)  //legge i parametri
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')  //tipo di operazione
  const next = searchParams.get('next') ?? '/'  //dove andare dopo (redirect)

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  //costruisci redirect

  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')
  //clean i tokens

  if (token_hash && type) {  //controlli che esistano
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      type: type as 'email',
      token_hash,
    })
    if (!error) {  //se tutto va bene ...
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }
  // return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
