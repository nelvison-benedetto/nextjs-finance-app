'use client'
import DateRangeSelect from '@/shared/components/atoms/DateRangeSelect'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'  //hooks x lavore w URL

export default function Range({ defaultView }: { defaultView?: string }) {
  const searchParams = useSearchParams()  //legge i parametri da url e.g./dashboard?range=last7days se fai searchParams.get('range') ottieni 'last7days'
  const pathname = usePathname()  //prende il path corrente e.g. '/dashboard'
  const { replace } = useRouter()  //funzione x cambiare URL, senza ricaricare pagina/aggiungere alla history
  const range = searchParams.get('range') ?? defaultView ?? 'last30days'

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {  //FUNZIONE CHIAMATA QUANDO CAMBIA IL SELECT
    const params = new URLSearchParams()  //crea nuovi parametri URL
    params.set('range', e.target.value)    //setti ...?range=valoreSelezionato
    replace(`${pathname}?${params.toString()}`)  //aggiorni url
  }

  return <DateRangeSelect value={range} onChange={handleChange} />  //value è il valore attuale, onChange è l'handler

}
