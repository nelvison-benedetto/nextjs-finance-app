import Link from 'next/link'
import ToggleDarkMode from '@/shared/components/molecules/ToggleDarkMode'
import { getServerTheme } from '@/shared/hooks/useServerDarkMode'
import { createClient } from '@/lib/supabase/server'
import { KeyRound } from 'lucide-react'
import { sizes, variants } from '@/lib/variants'
import SignOutButton from '@/shared/components/molecules/SignOutButton'
import Avatar from '@/shared/components/molecules/Avatar'

export default async function AppHeader({ className }: { className?: string }) {
  const theme = await getServerTheme()
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser() //quando utete ha fatto login viene creata sessione + salva token nel cookie, ora ad ogni richiest (e.g. utente apre page /dashboard) il browser manda automaticamente Cookie: sb-access-token=..., quindi ora con auth.getUser() supabase legge il cookie sb-access-token) verifica il token recupera l'utente dal backend e te lo restituisce
  return (
    <header className={`flex justify-between items-center ${className ?? ''}`}>
      <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">Finance App</Link>

      <div className="flex items-center">
        <ToggleDarkMode defaultMode={theme} />
        {user && <Link href="/dashboard/settings" className={`flex items-center space-x-1 ${variants['ghost']} ${sizes['sm']}`}>
          <Avatar />
          <span>{user?.user_metadata?.fullName ?? user?.email}</span>
        </Link>}
        {user && <SignOutButton />}
        {!user && <Link href="/login" className={`${variants['ghost']} ${sizes['sm']}`}>
          <KeyRound className="w-6 h-6" />
        </Link>}
      </div>
    </header>
  )
}
