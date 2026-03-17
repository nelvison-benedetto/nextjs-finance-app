import { cookies } from 'next/headers';  //x leggere i cookie lato server

export type Theme = 'light' | 'dark';

export async function getServerTheme(defaultTheme: Theme = 'dark'): Promise<Theme> {
  const cookieStore = await cookies();  //accesso ai cookie della richiesta
  const themeCookie = cookieStore.get('theme')?.value;  //prende il valore, altrimenti undefined
  if (themeCookie === 'light' || themeCookie === 'dark') return themeCookie;
  return defaultTheme;
}
