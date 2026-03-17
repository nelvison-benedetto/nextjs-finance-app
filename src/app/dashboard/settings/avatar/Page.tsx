'use client'
import AlertError from '@/shared/components/molecules/AlertError'
import AlertSuccess from '@/shared/components/molecules/AlertSuccess'
import Input1 from '@/shared/components/atoms/Input1'
import SubmitButton from '@/shared/components/molecules/SubmitButton'
import { uploadAvatar } from '@/lib/actions'
import { useActionState } from 'react'

const initialState = {
  message: '',
  error: false
}

export default function Page() {
  const [state, formAction] = useActionState(uploadAvatar, initialState)
  return <>
    <h1 className="text-4xl font-semibold mb-8">
      Avatar
    </h1>
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message.length > 0 && <AlertSuccess>{state?.message}</AlertSuccess>}
      <Input1 type="file" name="file" id="file" />
      <SubmitButton>Upload Avatar</SubmitButton>
    </form>
  </>
}
