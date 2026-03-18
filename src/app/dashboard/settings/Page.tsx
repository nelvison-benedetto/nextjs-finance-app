import { createClient } from '@/lib/supabase/server'
import SettingsForm from './components/SettingsForm'

export default async function Page() {  //è async quindi puo fare fetch diretto e gira su server!!
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const defaults = user?.user_metadata ?? {}   //se user proprio non esiste, allora defaults sara undefined
  return (<>
    <h1 className="text-4xl font-semibold mb-8">
      Settings
    </h1>
    <SettingsForm defaults={defaults} />
  </>)
}
