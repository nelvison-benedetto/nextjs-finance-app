import { createClient } from '@/lib/supabase/server'
import { CircleUser } from 'lucide-react'
import Image from 'next/image'

export default async function Avatar({ width = 32, height = 32 }: { width?: number; height?: number }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()  //quando utete ha fatto login viene creata sessione + salva token nel cookie, ora ad ogni richiest (e.g. utente apre page /dashboard) il browser manda automaticamente Cookie: sb-access-token=..., quindi ora con auth.getUser() supabase legge il cookie sb-access-token) verifica il token recupera l'utente dal backend e te lo restituisce
  const { data: imageData, error } = await supabase.storage
    .from('avatars')
    .createSignedUrl(user?.user_metadata?.avatar, 60 * 5)
  //va nel bucket storage chiamato 'avatars', 'user?.user_metadata?.avatar' è il path del file e.g."user-123.png", createSignedUrl(path, 60 * 5) crea URL temporaneo sicuro valido 5min.

  if (error) {
    return <CircleUser className="w-6 h-6" />  //icona fallback
  }

  return (  //rendering img
    <Image
      src={imageData.signedUrl}
      width={width}
      height={height}
      alt="User avatar"
      className="rounded-full"
    />
  );
}
