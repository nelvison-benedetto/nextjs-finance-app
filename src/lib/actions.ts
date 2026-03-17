'use server'
import { revalidatePath } from 'next/cache'  //!aggiorna la cache
import { createClient } from './supabase/server'
import { transactionSchema } from './validation'  //my x validate i dati
import { redirect } from 'next/navigation'  //x redirect lato server

type ActionState = {
  message: string
  error?: boolean
} //x le risposte nel form e.g.{ error: true, message: "Errore" }

export async function createTransaction(formData: Record<string, unknown>) {
  const validated = transactionSchema.safeParse(formData)
  if (!validated.success) {
    throw new Error('Invalid data')
  }
  //validi i dati w ur custom zod validation scheme

  const supabase = await createClient()  //connessione a supabase
  const { error } = await supabase.from('transactions')
    .insert(formData)  //insert nel db.

  if (error) {
    throw new Error('Failed creating the transaction')
  }

  revalidatePath('/dashboard')  //REFRESH UI aggiorna la pagina di dashboard
}

export async function updateTransaction(id: number, formData: Record<string, unknown>) {
  const validated = transactionSchema.safeParse(formData)
  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const supabase = await createClient()
  const { error } = await supabase.from('transactions')
    .update(formData)
    .eq('id', id)
  //aggiorna i dati su supabase dove id è quello passato!

  if (error) {
    throw new Error('Failed updating the transaction')
  }

  revalidatePath('/dashboard')
}

export async function fetchTransactions(range: string, offset = 0, limit = 10) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .rpc('fetch_transactions', {  //CHIAMA UNA FUNZIONE NEL DB SUPABASE!!
      limit_arg: limit,
      offset_arg: offset,
      range_arg: range
    })
  if (error) throw new Error("We can't fetch transactions")
  return data
}

export async function deleteTransaction(id: number) {
  const supabase = await createClient()
  const { error } = await supabase.from('transactions')
    .delete()
    .eq('id', id)
  if (error) throw new Error(`Could not delete the transaction ${id}`)
  revalidatePath('/dashboard')
}

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {  //utilizzo di OTP (magic link) di Supabase
  const supabase = await createClient()
  const email = formData.get('email')
  const { error } = await supabase.auth.signInWithOtp({
    email: email as string,
    options: {
      shouldCreateUser: true
    }
  })
  if (error) {
    return {
      error: true,
      message: 'Error authenticating!'
    }
  }
  return {
    message: `Email sent to ${email}`
  }
}
//return { message: "Email sent to ..." } o { error: true, message: "Error authenticating!" }

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
} //x logout + redirect to /login page

export async function uploadAvatar(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()
  const file = formData.get('file') as File  //prendi il file
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`  //genera un nome univoco
  const { error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file)
  if (error) {
    return {
      error: true,
      message: 'Error uploading avatar'
    }
  }

  // Removing the old file
  const { data: userData, error: userError } = await supabase.auth.getUser()  //prendi utente
  if (userError) {
    return {
      error: true,
      message: 'Something went wrong, try again'
    }
  }

  const avatar = userData.user.user_metadata.avatar
  if (avatar) {
    const { error: removeError } = await supabase.storage
      .from('avatars')
      .remove([avatar])  //cancella avatar vecchio

    if (removeError) {
      return {
        error: true,
        message: 'Something went wrong, try again'
      }
    }
  }

  const { error: dataUpdateError } = await supabase.auth
    .updateUser({
      data: {
        avatar: fileName
      }
    }) //salva il nuovo avatar
  if (dataUpdateError) {
    return {
      error: true,
      message: 'Error associating the avatar with the user'
    }
  }

  return {
    message: 'Updated the user avatar'
  }
}

export async function updateSettings(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient()
  const { error } = await supabase.auth
    .updateUser({
      data: {
        fullName: formData.get('fullName'),
        defaultView: formData.get('defaultView')
      }
    })  //aggiorna metadata utente

  if (error) {
    return {
      error: true,
      message: 'Failed updating setting'
    }
  }

  return {
    message: 'Updated user settings'
  }
}
